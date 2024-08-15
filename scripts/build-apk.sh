#!/bin/sh

CWD="$(pwd)"

NORMAL='\033[22m'
BOLD='\033[1m'

# Reset
BLACK_COLOR='\033[30m'
RED_COLOR='\033[31m'
GREEN_COLOR='\033[21m'
YELLOW_COLOR='\033[33m'
BLUE_COLOR='\033[34m'
WHITE_COLOR='\033[37m'

DEFAULT_ENV="dev"
APP_RELEASE_NAME=Demo-v

cm_print_command(){
    echo "${BOLD}${BLUE_COLOR}$ $1${WHITE_COLOR}${NORMAL}"
}

cm_print_text(){
    echo "${BOLD}${BLUE_COLOR}$1${WHITE_COLOR}${NORMAL}"
}

cm_exit()
{
    cd $CWD
    exit
}  

cm_helper() 
{
    echo "${BOLD}/bin/bash ./build-apk.sh [-e, --environment] <environment>"
    echo "${NORMAL}Environment includes dev, staging, production"
    echo "Will run dev if the environment is empty"
    echo ""
    echo "You can also print more details about any of these commands by calling them with the ${BLUE_COLOR}-h,--help ${WHITE_COLOR}flag right after the command name."
}

cm_notfound() 
{
    echo "Not found comand ${BOLD}/bin/bash ./build-apk.sh ${*}"
    echo "${NORMAL}"
    echo "You can also print more details about any of these commands by calling them with the ${BLUE_COLOR}-h,--help ${WHITE_COLOR}flag right after the command name."
}

cm_get_appname()
{
    echo "🚀 Creating app name"
    VERSION_STRING=""
    VERSION_CODE=""
    while read -r LINE; do
        if [[ $LINE == *'='* ]] && [[ $LINE != '#'* ]]; then
            ENV_VAR="$(echo $LINE)"
            if [[ "$ENV_VAR" == ANDROID_APP_VERSION_NAME* ]]; then
                VERSION_STRING+=$(echo $ENV_VAR| cut -d'=' -f 2)
            fi
            if [[ "$ENV_VAR" == ANDROID_APP_VERSION_CODE* ]]; then  
                VERSION_CODE+="($(echo $ENV_VAR| cut -d'=' -f 2))"
            fi
        fi
    done < $ENVFILE
    APP_RELEASE_NAME+="${VERSION_STRING}${VERSION_CODE}.apk"
    cm_print_text "🚀 Declare appName $APP_RELEASE_NAME"
}

cm_process()
{
    cm_print_text "🚀 Cleaning project..."
    cm_print_command "cd $CWD/android"
    cd "$CWD/android" 
    ./gradlew clean

    cm_print_command "./gradlew app:assembleDevRelease"
    ./gradlew app:assembleDevRelease
}

cm_reaname_apk()
{
    cm_print_command "Rename app-dev-release.apk to $APP_RELEASE_NAME"
    RELATED_PATH+="/dev/release"
    cd "$RELATED_PATH"
    mv app-dev-release.apk $APP_RELEASE_NAME
    echo "$RELATED_PATH/$APP_RELEASE_NAME"
}
cm_build_apk()
{
    cm_print_text "🚀 Starting with environment $ENVFILE"

    echo "🚀 Starting build file apk..."
    RELATED_PATH="$CWD/android/app/build/outputs/apk"
    cm_get_appname
    
    if [[ "$ENVFILE" == *.staging ]]; then 
        cm_process DemoStaging
        cm_reaname_apk demoStaging
        cm_reaname_apk demoIntegration
    elif [[ "$ENVFILE" == *.production ]]; then  
        cm_process demoProduct
        cm_reaname_apk demoProduct
    else
        cm_process demo
        cm_reaname_apk demo
    fi  

    cm_exit
}

if [ "$1" == "-h" ] || [ "$1" == "--help" ]; then
    cm_helper
    cm_exit
else
    cm_build_apk
fi
