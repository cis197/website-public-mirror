# Script to update the public mirror of the CIS 197 website

echo "Cloning website...\n"

# Remove previous mirror
rm -rf src

# Clone the private repo
git clone git@github.com:cis197/website.git

echo "\nRemoving private files...\n"

# Remove files which should not be in the public clone
rm -rf website/.git
rm -rf website/scripts
rm -rf website/public
rm -rf website/scripts
rm -rf website/archive
rm -rf website/homeworks

# Remove license, since there is one at the root of this repo
rm -rf website/LICENSE

# Rename file to be src
mv website src

echo "Pushing to GitHub...\n"

# Push to GitHub
git add src
git commit -m "Mirror"
git push

echo "\nDone."
