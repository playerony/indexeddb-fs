developBranchName=$(git remote show origin | sed -n '/HEAD branch/s/.*: //p')
echo "Info: Detach develop branch name as: '$developBranchName'."

git checkout $developBranchName
echo "Info: Checkout to '$developBranchName' branch."

git pull origin $developBranchName
echo "Info: Pull changes from '$developBranchName' branch."
