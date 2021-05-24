#!/bin/bash
# Build html files from scratch from the latest notebooks.
# (Tested on MacOS 10.15.7 with conda installed.)

SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )"
tmp_dir=$(mktemp -d -t update_content_)

echo SCRIPT_DIR is $SCRIPT_DIR
echo tmp_dir is $tmp_dir

cd $tmp_dir
git clone https://github.com/NASA-NAVO/navo-workshop.git
cd navo-workshop

conda env create --name update_content --file environment.yml
eval "$(conda shell.bash hook)"
conda activate update_content

jupyter nbconvert --execute --to html *.ipynb

cp *.html $SCRIPT_DIR

echo
echo "# New html generated.  "
echo "# Check index.html to see if it needs to be updated for new content."
echo "# Check git status, add, commit and push new content."
echo
echo "# Cleanup once you're sure it worked."
echo rm -rf $tmp_dir
echo conda env remove --name update_content
