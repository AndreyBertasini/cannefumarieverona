$filePath = "C:\Users\User\Desktop\Installazione Canne Fumarie a Verona\home.html"

# Read the content of the file
$content = Get-Content -Path $filePath -Raw

# First, remove all comments related to stufe-pellet sections
$content = $content -replace '<!-- STUFE A PELLET.*?-->', ''

# Remove all sections with stufe-pellet- in the id
# This pattern matches from the opening div tag to the closing div tag
$pattern = '(?s)<div class="page-content" id="stufe-pellet-[^"]*">.*?</div>\s*(?=<div class="page-content"|$)'
$content = $content -replace $pattern, ''

# Remove any references to stufe-pellet- sections in links
$content = $content -replace '<a href="#" onclick="showPage\(''stufe-pellet-[^'']*''\)[^>]*>[^<]*</a>', 'la nostra guida'

# Fix any potential HTML structure issues
# Remove any empty sections or divs
$content = $content -replace '(?s)<section[^>]*>\s*<div[^>]*>\s*</div>\s*</section>', ''
$content = $content -replace '(?s)<div[^>]*>\s*</div>', ''

# Write the modified content back to the file
$content | Set-Content -Path $filePath -NoNewline

Write-Host "All stufe-pellet content has been removed and HTML structure has been fixed."