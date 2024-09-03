#!/bin/bash

# Check if the .env file exists
if [ ! -f .env ]; then
  echo ".env file not found!"
  exit 1
fi

# Array of required environment variables
required_env_vars=(
  "MONGO_INITDB_ROOT_USERNAME"
  "MONGO_INITDB_ROOT_PASSWORD"
  "PAYLOAD_SECRET"
  "DOMAIN"
  "OPENAI_API_KEY"
  "ASTRA_DB_NAMESPACE"
  "ASTRA_DB_ENDPOINT"
  "ASTRA_DB_APPLICATION_TOKEN"
)

# Function to check if a variable exists in the .env file
check_env_var() {
  local var_name=$1
  if grep -qE "^\s*export\s+$var_name=" .env; then
    return 0
  else
    return 1
  fi
}

# Function to prompt for value and append to .env file
prompt_for_value() {
  local var_name=$1
  read -p "Enter value for $var_name: " var_value
  echo "export $var_name=$var_value" >> .env
}

# Iterate over the required environment variables and check each one
all_vars_set=true
for var in "${required_env_vars[@]}"; do
  if ! check_env_var "$var"; then
    all_vars_set=false
    read -p "$var is not set in the .env file. Do you want to add it? (y/n) " choice
    case "$choice" in
      y|Y ) prompt_for_value "$var";;
      n|N ) echo "Skipping $var.";;
      * ) echo "Invalid choice. Skipping $var.";;
    esac
  fi
done

if $all_vars_set; then
  echo "Configuration Complete, All Variables Set."
else
  echo "Process Terminated."
fi

exit 0
