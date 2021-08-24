#!/bin/bash

# setting up some useful aliases
echo "alias l='ls -l'" > ~/.bashrc
echo "alias ..='cd ..'" >> ~/.bashrc

if [ ! -d "node_modules" ]; then

  echo " "
  echo -e "\e[1;32m************************************\n\e[1;32m* install dependencies             *\n\e[0m"
  echo " "
  npm install
  echo " "
  echo -e "\e[1;32m* dependencies installed           *\n\e[1;32m************************************\e[0m"
  echo " "

else

  echo -e "\e[1;32m************************************\n\e[1;32m* skip installation because        *\n\e[0m"
  echo -e "\e[1;32m* dependencies already installed   *\n\e[1;32m************************************\e[0m"

fi

echo -e "\e[1;32m––––––––––––––––––––––––––––––––––––\n\e[1;32m  serve application\e[0m"
echo " "

# --poll: Reduces issues with auto reload on file changes
# --host: App is accessible in local network
npx npm start --poll=1000

tail -f /dev/null
