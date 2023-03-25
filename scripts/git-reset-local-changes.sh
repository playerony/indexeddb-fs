while true; do
  read -p "Reset all of your local changes: commits, untracked files, untracked directories. Proceed? (Y/n)" yn
  case $yn in
  [Yy]*) break ;;
  [Nn]*) exit ;;
  *) break ;;
  esac
done

currentBranch=$(git branch | sed -n -e 's/^\* \(.*\)/\1/p')

# To remove untracked files
git clean -f

# To remove untracked directories
git clean -fd

# revert changes to index
git reset --hard

# remove all local commits
git fetch origin
git reset --hard origin/$currentBranch

git fetch --all
