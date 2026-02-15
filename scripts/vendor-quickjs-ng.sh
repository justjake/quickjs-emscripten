#!/usr/bin/env bash
set -euo pipefail

# Vendor a specific version of quickjs-ng from the release amalgam
# Usage: ./scripts/vendor-quickjs-ng.sh v0.12.1

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
VENDOR_DIR="$REPO_ROOT/vendor/quickjs-ng"

if [[ $# -lt 1 ]]; then
    echo "Usage: $0 <version>"
    echo "Example: $0 v0.12.1"
    exit 1
fi

VERSION="$1"

# Validate version format (should start with 'v')
if [[ ! "$VERSION" =~ ^v[0-9] ]]; then
    echo "Error: Version should start with 'v' (e.g., v0.12.1)"
    exit 1
fi

DOWNLOAD_URL="https://github.com/quickjs-ng/quickjs/releases/download/${VERSION}/quickjs-amalgam.zip"
TEMP_DIR=$(mktemp -d)
ZIP_FILE="$TEMP_DIR/quickjs-amalgam.zip"

echo "Vendoring quickjs-ng ${VERSION}"
echo "Download URL: ${DOWNLOAD_URL}"

# Download the amalgam zip
echo "Downloading..."
if ! curl -fSL -o "$ZIP_FILE" "$DOWNLOAD_URL"; then
    echo "Error: Failed to download ${DOWNLOAD_URL}"
    echo "Check that the version exists at https://github.com/quickjs-ng/quickjs/releases"
    rm -rf "$TEMP_DIR"
    exit 1
fi

# Remove existing vendor directory contents
echo "Removing existing vendor/quickjs-ng contents..."
if [[ -d "$VENDOR_DIR" ]]; then
    git -C "$REPO_ROOT" rm -rf "$VENDOR_DIR" || rm -rf "$VENDOR_DIR"
fi
mkdir -p "$VENDOR_DIR"

# Extract the zip
echo "Extracting..."
unzip -q "$ZIP_FILE" -d "$TEMP_DIR/extracted"

# Move contents to vendor directory
# The zip might have a top-level directory or files directly
if [[ -d "$TEMP_DIR/extracted/quickjs-amalgam" ]]; then
    mv "$TEMP_DIR/extracted/quickjs-amalgam"/* "$VENDOR_DIR/"
elif [[ -d "$TEMP_DIR/extracted/quickjs" ]]; then
    mv "$TEMP_DIR/extracted/quickjs"/* "$VENDOR_DIR/"
else
    # Files are directly in extracted directory
    mv "$TEMP_DIR/extracted"/* "$VENDOR_DIR/"
fi

# Write VERSION file
echo "Writing VERSION file..."
echo "$VERSION" > "$VENDOR_DIR/VERSION"

# Download LICENSE file (not included in amalgam)
echo "Downloading LICENSE..."
LICENSE_URL="https://raw.githubusercontent.com/quickjs-ng/quickjs/${VERSION}/LICENSE"
if ! curl -fSL -o "$VENDOR_DIR/LICENSE" "$LICENSE_URL"; then
    echo "Warning: Failed to download LICENSE file"
fi

# Clean up
rm -rf "$TEMP_DIR"

# Stage the changes
echo "Staging changes..."
git -C "$REPO_ROOT" add "$VENDOR_DIR"

echo ""
echo "Successfully vendored quickjs-ng ${VERSION}"
echo "Files are staged. Review with 'git status' and commit when ready."
