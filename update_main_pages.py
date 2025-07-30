import os
from bs4 import BeautifulSoup

# Paths
TEMPLATE_PATH = 'templates/unified-menu.html'
MAIN_PAGES = [
    'index.html',
    'home.html',
    'normative.html',
    'comuni.html',
    'materiali.html',
    'guida-installazione.html'
]

def update_main_page(page_path):
    """Update a main page with the unified menu."""
    # Read the current page
    with open(page_path, 'r', encoding='utf-8') as file:
        content = file.read()
    
    # Parse HTML
    soup = BeautifulSoup(content, 'html.parser')
    
    # Read the unified menu template
    with open(TEMPLATE_PATH, 'r', encoding='utf-8') as file:
        menu_template = file.read()
    
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
    
    # Add the unified menu script if it doesn't exist
    script_exists = False
    for script_tag in soup.find_all('script'):
        if 'unified-menu.js' in script_tag.get('src', ''):
            script_exists = True
            break
    
    if not script_exists:
        # Add before the closing body tag
        script_tag = soup.new_tag('script')
        script_tag['src'] = 'js/unified-menu.js'
        soup.body.append(script_tag)
    
    # Write the updated page
    with open(page_path, 'w', encoding='utf-8') as file:
        file.write(str(soup))
    
    print(f"Updated {page_path}")

def main():
    """Main function to update all main pages."""
    print("Updating main pages...")
    
    for page in MAIN_PAGES:
        if os.path.exists(page):
            update_main_page(page)
        else:
            print(f"Warning: {page} not found")
    
    print("\nDone!")

if __name__ == "__main__":
    main()