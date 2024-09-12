#!/bin/bash

# Check if COMMIT_COUNTER is set and a valid number
if [[ -z "$COMMIT_COUNTER" || ! "$COMMIT_COUNTER" =~ ^[0-9]+$ ]]; then
  # Initialize the counter if it's not set or not a valid number
  COMMIT_COUNTER=0
fi

# Increment the counter
COMMIT_COUNTER=$((COMMIT_COUNTER + 1))

# Export the updated counter
export COMMIT_COUNTER

# Prompt the user for input
read -p "Commit Message: " user_input

# Save the input to a variable
commit_message="Sep 11 Commit $COMMIT_COUNTER: $user_input"

# Add all changes to the staging area
git add .

# Commit with the message
git commit -m "$commit_message"

# Push changes
git push