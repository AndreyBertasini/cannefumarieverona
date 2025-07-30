$filePath = "C:\Users\User\Desktop\Installazione Canne Fumarie a Verona\home.html"

# Read the content of the file
$content = Get-Content -Path $filePath -Raw

# Define the pattern to match all stufe-pellet-* sections
$pattern = '(?s)<div class="page-content" id="stufe-pellet-[^"]*">.*?</div>\s*(?:<!--.*?-->)?'

# Replace all matches with an empty string
$newContent = $content -replace $pattern, ''

# Write the modified content back to the file
$newContent | Set-Content -Path $filePath -NoNewline

Write-Host "All stufe-pellet-* sections have been removed from the file."