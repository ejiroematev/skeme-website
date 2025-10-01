#!/bin/bash

# Define color codes
RED='\033[1;31m'
GRN='\033[1;32m'
BLU='\033[1;34m'
YEL='\033[1;33m'
PUR='\033[1;35m'
CYAN='\033[1;36m'
NC='\033[0m'

# Display header
echo -e "${CYAN}Bypass MDM By Assaf Dori (assafdori.com)${NC}"
echo ""

# Prompt user for choice
PS3='Please enter your choice: '
options=("Bypass MDM from Recovery" "Disable Notification (SIP)" "Disable Notification (Recovery)" "Check MDM Enrollment" "Reboot & Exit")
select opt in "${options[@]}"; do
    case $opt in
        "Bypass MDM from Recovery")
            echo -e "${YEL}Bypass MDM from Recovery${NC}"
            
            # Detect volumes
            DATA_VOLUME="disk3s1"
            SYSTEM_VOLUME="APPLE SSD"
            
            if [ -z "$DATA_VOLUME" ] || [ -z "$SYSTEM_VOLUME" ]; then
                echo -e "${RED}Error: Could not detect Data or System volume!${NC}"
                exit 1
            fi

            # Rename Data volume if necessary
            if [ "$DATA_VOLUME" != "Data" ]; then
                if ! diskutil rename "$DATA_VOLUME" "Data"; then
                    echo -e "${RED}Failed to rename Data volume!${NC}"
                    exit 1
                fi
            fi

            # Create Temporary User
            echo -e "${NC}Create a Temporary User"
            read -p "Enter Temporary Fullname (Default is 'Apple'): " realName
            realName="${realName:=Apple}"
            read -p "Enter Temporary Username (Default is 'Apple'): " username
            username="${username:=Apple}"
            read -p "Enter Temporary Password (Default is '1234'): " passw
            passw="${passw:=1234}"

            # Create User
            dscl_path='/Volumes/Data/private/var/db/dslocal/nodes/Default'
            lastID=$(dscl . -list /Users UniqueID | awk '{print $2}' | sort -n | tail -1)
            newID=$((lastID + 1))
            
            if ! dscl -f "$dscl_path" localhost -create "/Local/Default/Users/$username"; then
                echo -e "${RED}Failed to create user!${NC}"
                exit 1
            fi
            dscl -f "$dscl_path" localhost -create "/Local/Default/Users/$username" UserShell "/bin/zsh"
            dscl -f "$dscl_path" localhost -create "/Local/Default/Users/$username" RealName "$realName"
            dscl -f "$dscl_path" localhost -create "/Local/Default/Users/$username" UniqueID "$newID"
            dscl -f "$dscl_path" localhost -create "/Local/Default/Users/$username" PrimaryGroupID "20"
            if ! mkdir "/Volumes/Data/Users/$username"; then
                echo -e "${RED}Failed to create home directory!${NC}"
                exit 1
            fi
            dscl -f "$dscl_path" localhost -create "/Local/Default/Users/$username" NFSHomeDirectory "/Users/$username"
            dscl -f "$dscl_path" localhost -passwd "/Local/Default/Users/$username" "$passw"
            dscl -f "$dscl_path" localhost -append "/Local/Default/Groups/admin" GroupMembership "$username"

            # Block MDM domains
            for domain in "deviceenrollment.apple.com" "mdmenrollment.apple.com" "iprofiles.apple.com"; do
                if ! echo "0.0.0.0 $domain" >> "/Volumes/APPLE\ SSD/etc/hosts"; then
                    echo -e "${RED}Failed to update hosts file!${NC}"
                    exit 1
                fi
            done
            echo -e "${GRN}Successfully blocked MDM & Profile Domains${NC}"

            # Remove configuration profiles
            if ! touch "/Volumes/Data/private/var/db/.AppleSetupDone"; then
                echo -e "${RED}Failed to create .AppleSetupDone!${NC}"
                exit 1
            fi
            rm -rf "/Volumes/$SYSTEM_VOLUME/var/db/ConfigurationProfiles/Settings/.cloudConfigHasActivationRecord"
            rm -rf "/Volumes/$SYSTEM_VOLUME/var/db/ConfigurationProfiles/Settings/.cloudConfigRecordFound"
            touch "/Volumes/$SYSTEM_VOLUME/var/db/ConfigurationProfiles/Settings/.cloudConfigProfileInstalled"
            touch "/Volumes/$SYSTEM_VOLUME/var/db/ConfigurationProfiles/Settings/.cloudConfigRecordNotFound"

            echo -e "${GRN}MDM enrollment has been bypassed!${NC}"
            echo -e "${NC}Exit terminal and reboot your Mac.${NC}"
            break
            ;;
        "Disable Notification (SIP)")
            echo -e "${RED}Please Insert Your Password To Proceed${NC}"
            if ! sudo rm /var/db/ConfigurationProfiles/Settings/.cloudConfigHasActivationRecord; then
                echo -e "${RED}Failed to remove .cloudConfigHasActivationRecord!${NC}"
                exit 1
            fi
            if ! sudo rm /var/db/ConfigurationProfiles/Settings/.cloudConfigRecordFound; then
                echo -e "${RED}Failed to remove .cloudConfigRecordFound!${NC}"
                exit 1
            fi
            if ! sudo touch /var/db/ConfigurationProfiles/Settings/.cloudConfigProfileInstalled; then
                echo -e "${RED}Failed to create .cloudConfigProfileInstalled!${NC}"
                exit 1
            fi
            if ! sudo touch /var/db/ConfigurationProfiles/Settings/.cloudConfigRecordNotFound; then
                echo -e "${RED}Failed to create .cloudConfigRecordNotFound!${NC}"
                exit 1
            fi
            echo -e "${GRN}MDM notifications disabled (SIP)!${NC}"
            break
            ;;
        "Disable Notification (Recovery)")
            SYSTEM_VOLUME=$(diskutil list | grep 'Macintosh HD' | awk '{print $NF}' | head -n 1)
            if [ -z "$SYSTEM_VOLUME" ]; then
                echo -e "${RED}Error: Could not detect System volume!${NC}"
                exit 1
            fi
            rm -rf "/Volumes/$SYSTEM_VOLUME/var/db/ConfigurationProfiles/Settings/.cloudConfigHasActivationRecord"
            rm -rf "/Volumes/$SYSTEM_VOLUME/var/db/ConfigurationProfiles/Settings/.cloudConfigRecordFound"
            if ! touch "/Volumes/$SYSTEM_VOLUME/var/db/ConfigurationProfiles/Settings/.cloudConfigProfileInstalled"; then
                echo -e "${RED}Failed to create .cloudConfigProfileInstalled!${NC}"
                exit 1
            fi
            if ! touch "/Volumes/$SYSTEM_VOLUME/var/db/ConfigurationProfiles/Settings/.cloudConfigRecordNotFound"; then
                echo -e "${RED}Failed to create .cloudConfigRecordNotFound!${NC}"
                exit 1
            fi
            echo -e "${GRN}MDM notifications disabled (Recovery)!${NC}"
            break
            ;;
        "Check MDM Enrollment")
            echo ""
            echo -e "${GRN}Check MDM Enrollment. Error is success${NC}"
            echo ""
            echo -e "${RED}Please Insert Your Password To Proceed${NC}"
            echo ""
            if ! sudo profiles show -type enrollment; then
                echo -e "${GRN}No MDM enrollment found (success)!${NC}"
            else
                echo -e "${RED}MDM enrollment detected!${NC}"
            fi
            break
            ;;
        "Reboot & Exit")
            echo "Rebooting..."
            reboot
            break
            ;;
        *) echo -e "${RED}Invalid option $REPLY${NC}" ;;
    esac
done
