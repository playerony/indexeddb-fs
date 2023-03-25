commitMessage="$1"

currentBranch=$(git branch | sed -n -e 's/^\* \(.*\)/\1/p')
developBranchName=$(git remote show origin | sed -n '/HEAD branch/s/.*: //p')

if [ $currentBranch == $developBranchName ]; then
  echo 'Error: cannot push changes to '$developBranchName'.'

  exit 1
fi

if [ -z "$commitMessage" ]; then
  echo 'Error: commit message was not specified.'

  exit 1
fi

git add .
echo "Info: Staged all files."

git commit -m "$commitMessage"
echo "Info: Added the commit with message: '$commitMessage'."

git push origin "$currentBranch"
echo "Info: Push changes to '$currentBranch' branch."
