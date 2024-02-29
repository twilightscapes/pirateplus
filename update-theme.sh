#!/bin/bash

# Set the URL of your central repository
THEME_REPO_URL="https://github.com/twilightscapes/pirateplus"

# Set the branch or tag you want to pull updates from
BRANCH_OR_TAG="main"

# Check if src directory exists and move it to user_src_backup if it does
if [ -d "src" ]; then
    mv src user_src_backup
else
    echo "src directory not found, skipping backup"
fi

# Clone the central repository
git clone --branch $BRANCH_OR_TAG --depth 1 $THEME_REPO_URL tmp_theme

# Replace the src folder, excluding index.js files in pages directory
find tmp_theme/src -mindepth 1 -type f -not -path "*/pages/index.js" -exec rsync -R {} ./src \;

# Replace the gatsby-config.js file
cp tmp_theme/gatsby-config.js .

# Replace the gatsby-node.js file
cp tmp_theme/gatsby-node.js .

# Replace the netlify.toml file
cp tmp_theme/netlify.toml .

# Update the admin/config.yml file
cp tmp_theme/static/admin/config.yml static/admin/

# Copy the package.json file
cp tmp_theme/package.json .

# Move everything from tmp_theme/src to src/
mv tmp_theme/src/* src/

# Clean up
rm -rf tmp_theme

echo "PIRATE Plus updated successfully!"
