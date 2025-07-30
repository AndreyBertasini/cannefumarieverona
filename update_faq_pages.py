import os
import re
import glob
from bs4 import BeautifulSoup
from collections import defaultdict

# Paths
TEMPLATE_PATH = 'templates/faq-template.html'
FAQ_DIR = 'faq'
FAQ_INDEX_PATH = os.path.join(FAQ_DIR, 'index.html')

# Category mapping
CATEGORY_MAP = {
    'stufe-pellet': 'Stufe a Pellet',
    'stufe-legna': 'Stufe a Legna',
    'caminetti': 'Caminetti',
    'termostufe': 'Termostufe',
    'caldaie': 'Caldaie',
    'canne-fumarie': 'Canne Fumarie',
    'pellet': 'Pellet',
    'bioetanolo': 'Bioetanolo',
}

def extract_question_title(filename):
    """Extract the question title from the filename."""
    # Remove file extension
    basename = os.path.basename(filename)
    name_without_ext = os.path.splitext(basename)[0]
    
    # Replace hyphens with spaces and capitalize
    title = name_without_ext.replace('-', ' ')
    
    return title

def determine_category(content):
    """Determine the category of a FAQ page based on its content."""
    # Default category
    default_category = 'canne-fumarie'
    
    # Check for keywords in content to determine category
    content_lower = content.lower()
    
    if 'stufa a pellet' in content_lower or 'stufe a pellet' in content_lower:
        return 'stufe-pellet'
    elif 'stufa a legna' in content_lower or 'stufe a legna' in content_lower:
        return 'stufe-legna'
    elif 'camino' in content_lower or 'caminetto' in content_lower:
        return 'caminetti'
    elif 'termostufa' in content_lower:
        return 'termostufe'
    elif 'caldaia' in content_lower:
        return 'caldaie'
    elif 'canna fumaria' in content_lower:
        return 'canne-fumarie'
    elif 'pellet' in content_lower:
        return 'pellet'
    elif 'bioetanolo' in content_lower:
        return 'bioetanolo'
    
    return default_category

def get_faq_pages():
    """Get all FAQ pages and organize them by category."""
    faq_files = glob.glob(os.path.join(FAQ_DIR, '*.html'))
    faq_pages = []
    categories = defaultdict(list)
    
    # Skip index.html
    faq_files = [f for f in faq_files if os.path.basename(f) != 'index.html']
    
    for file_path in faq_files:
        with open(file_path, 'r', encoding='utf-8') as file:
            content = file.read()
        
        # Parse HTML
        soup = BeautifulSoup(content, 'html.parser')
        
        # Extract title
        title_tag = soup.find('title')
        title = title_tag.text.strip() if title_tag else extract_question_title(file_path)
        
        # Extract question title from h1
        h1_tag = soup.find('h1')
        question_title = h1_tag.text.strip() if h1_tag else title
        
        # Extract description
        meta_desc = soup.find('meta', attrs={'name': 'description'})
        description = meta_desc['content'] if meta_desc else f"FAQ: {question_title}"
        
        # Extract main content
        article = soup.find('article')
        content_html = str(article) if article else ""
        
        # Determine category
        category = determine_category(content_html)
        
        # Create page info
        page_info = {
            'path': file_path,
            'filename': os.path.basename(file_path),
            'title': title,
            'question_title': question_title,
            'description': description,
            'content': content_html,
            'category': category,
            'category_name': CATEGORY_MAP.get(category, 'FAQ')
        }
        
        faq_pages.append(page_info)
        categories[category].append(page_info)
    
    return faq_pages, categories

def generate_related_links(page_info, categories):
    """Generate related links for a FAQ page."""
    category = page_info['category']
    current_filename = page_info['filename']
    
    # Get other pages in the same category
    same_category_pages = [p for p in categories[category] if p['filename'] != current_filename]
    
    # Generate HTML for related category links
    related_category_links = ""
    for p in same_category_pages[:5]:  # Limit to 5 links
        related_category_links += f'<li><a href="{p["filename"]}">{p["question_title"]}</a></li>\n'
    
    # Generate HTML for related questions
    related_questions = ""
    # First try to get pages from the same category
    related_from_category = same_category_pages[:3]
    
    # Then add some from other categories if needed
    if len(related_from_category) < 3:
        other_pages = []
        for cat, pages in categories.items():
            if cat != category:
                other_pages.extend(pages)
        
        # Sort by relevance (could be improved with actual content analysis)
        other_pages = sorted(other_pages, key=lambda x: len(set(x['question_title'].lower().split()) & 
                                                       set(page_info['question_title'].lower().split())), 
                          reverse=True)
        
        related_from_other = other_pages[:3-len(related_from_category)]
        related_pages = related_from_category + related_from_other
    else:
        related_pages = related_from_category
    
    # Generate HTML
    for p in related_pages:
        related_questions += f'<li><a href="{p["filename"]}">{p["question_title"]}</a></li>\n'
    
    return related_category_links, related_questions

def update_faq_pages():
    """Update all FAQ pages with the unified template."""
    # Read template
    with open(TEMPLATE_PATH, 'r', encoding='utf-8') as file:
        template = file.read()
    
    # Get FAQ pages and categories
    faq_pages, categories = get_faq_pages()
    
    # Update each FAQ page
    for page_info in faq_pages:
        # Generate related links
        related_category_links, related_questions = generate_related_links(page_info, categories)
        
        # Apply template
        page_content = template
        page_content = page_content.replace('{{TITLE}}', page_info['title'])
        page_content = page_content.replace('{{DESCRIPTION}}', page_info['description'])
        page_content = page_content.replace('{{QUESTION_TITLE}}', page_info['question_title'])
        page_content = page_content.replace('{{CONTENT}}', page_info['content'])
        page_content = page_content.replace('{{CATEGORY_ID}}', page_info['category'])
        page_content = page_content.replace('{{CATEGORY_NAME}}', page_info['category_name'])
        page_content = page_content.replace('{{RELATED_CATEGORY_LINKS}}', related_category_links)
        page_content = page_content.replace('{{RELATED_QUESTIONS}}', related_questions)
        
        # Write updated page
        with open(page_info['path'], 'w', encoding='utf-8') as file:
            file.write(page_content)
        
        print(f"Updated {page_info['filename']}")
    
    print(f"Updated {len(faq_pages)} FAQ pages")

def update_faq_index():
    """Update the FAQ index page with the unified menu."""
    # Read the current index page
    with open(FAQ_INDEX_PATH, 'r', encoding='utf-8') as file:
        content = file.read()
    
    # Parse HTML
    soup = BeautifulSoup(content, 'html.parser')
    
    # Read the unified menu template
    with open('templates/unified-menu.html', 'r', encoding='utf-8') as file:
        menu_template = file.read()
    
    # Adjust paths for the FAQ directory
    menu_template = menu_template.replace('href="index.html', 'href="../index.html')
    menu_template = menu_template.replace('href="faq/', 'href="')
    menu_template = menu_template.replace('href="guida-installazione.html', 'href="../guida-installazione.html')
    menu_template = menu_template.replace('href="materiali.html', 'href="../materiali.html')
    menu_template = menu_template.replace('href="comuni.html', 'href="../comuni.html')
    menu_template = menu_template.replace('href="normative.html', 'href="../normative.html')
    
    # Replace the existing navigation with the unified menu
    nav_tag = soup.find('nav')
    if nav_tag:
        nav_tag.replace_with(BeautifulSoup(menu_template, 'html.parser'))
    else:
        # If no nav tag exists, add it after the body tag
        body_tag = soup.find('body')
        if body_tag:
            menu_soup = BeautifulSoup(menu_template, 'html.parser')
            body_tag.insert(0, menu_soup)
    
    # Add the unified menu script
    script_tag = soup.new_tag('script')
    script_tag['src'] = '../js/unified-menu.js'
    soup.body.append(script_tag)
    
    # Write the updated index page
    with open(FAQ_INDEX_PATH, 'w', encoding='utf-8') as file:
        file.write(str(soup))
    
    print(f"Updated {FAQ_INDEX_PATH}")

def main():
    """Main function to update all FAQ pages."""
    print("Updating FAQ pages...")
    update_faq_pages()
    
    print("\nUpdating FAQ index page...")
    update_faq_index()
    
    print("\nDone!")

if __name__ == "__main__":
    main()