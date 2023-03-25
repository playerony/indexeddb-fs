branchName="$1"

if [ -z "$branchName" ]; then
  echo 'Error: branch name was not specified.'

  exit 1
fi

exists=$(git show-ref refs/heads/$branchName)
if [ -n "$exists" ]; then
  echo "Error: '$branchName' branch already exists."

  exit 1
fi

git branch $branchName
echo "Info: Created branch with name: '$branchName'."

git checkout $branchName
echo "Info: Checkout to created branch."
