import { showPopup } from "./register_and_login.js";
import { loadMessages } from "./messages.js";
import { disableBackgroundEnableModalMode, reenableBackgroundDisableModalMode } from "./multiuser.js";

let currentChannel = '0';

const homeScreenName = "home-page";
const none = 'none';
const visible = 'block';
const privateChannel = 'Private';
const channelClassName = 'channel';
const channelsList = 'channels-list'
const invalidNameMessage = "Invalid name";
const channelCreatedMessage = "Channel created!"
const channelsPanelName = "channels-panel";
const channelsMessageListName = "channel-message-list";
const channelName = "channel-name";
const slackrTitleName = "slackr-title";
const channelsListTitleName = "channels-title";
const channelInfoName = "channel-info";
const channelInfoNameName = "channel-info-name";
const channelInfoDescriptionName= "channel-info-description";
const channelInfoChannelTypeName = "channel-info-channel-type";
const channelInfoCreationTimestampInfoName = "channel-info-creation-timestamp";
const channelInfoCreatorName = "channel-info-creator";
const channelScreenName = "channels-screen";
const closeChannelInfoButtonName = "close-channel-info-button";
const updateChannelInfoButtonName = "update-channel-info-button";
const updateChannelInfoFormName = "update-channel-info-form";
const closeUpdateChannelInfoButtonName = "close-update-channel-info-button"
const newChannelInfoNameName = "new-channel-info-name";
const newChannelInfoDescriptionName = "new-channel-info-description";
const submitNewChannelInfoName = "submit-new-channel-info";
const channelJoinLeaveButtonName = "channel-join-leave-button";
const notChannelMemberMessage = "Error: Not a channel member";
const joinChannelMessage = "Press the Join button to become a channel member.";
const successfulJoinChannelMessage = "Successfully joined!";
const successfulLeaveChannelMessage = "Successfully left!";
const cannotJoinPrivateChannelMessage = "Can't join private channel";
const channelMessageListName = "channel-message-list";
const messageInputImageName = "channel-message-input-image";
const messageInputSubmitName = "channel-message-input-submit";
const removeFileButtonName = "remove-file-button";
const showPinnedMessagesButtonName = "show-pinned-messages";
const showChannelInfoButtonName = "show-channel-info";
const inviteUsersButtonName = "invite-users"
const editProfileInfoButtonName = "show-profile-info";
const showNextMessagesName = "show-previous-messages";
const showPreviousMessagesName = "show-next-messages";
const messagePageNumberName = "message-page-number";
const cannotShowChannelInfo = "Error showing channel info";
const errorShowingHomeScreen = "Error loading home screen";
const cannotCreateChannel = "Cannot create channel";
const submitChannelInfoError = "Error submitting channel info";
const logoutButtonName = "logout-button";
const logoutError = "Logout error";
const successfulLogout = "Logged out!";
const loginFormName = "login-form";
const registerFormName = "register-form";
const messageInputName = "channel-message-input";

const homeScreen = document.getElementById(homeScreenName);
const channelsSection = document.getElementById(channelsList);
const channelsPanel = document.getElementById(channelsPanelName);
const channelNameOnScreen = document.getElementById(channelName)
const channelScreen = document.getElementById(channelScreenName);
const channelInfoNameValue = document.getElementById(channelInfoNameName);
const channelInfoDescriptionValue = document.getElementById(channelInfoDescriptionName);
const channelInfoChannelTypeValue = document.getElementById(channelInfoChannelTypeName);
const channelInfoCreationTimestampValue = document.getElementById(channelInfoCreationTimestampInfoName);
const channelInfoCreatorValue = document.getElementById(channelInfoCreatorName);
const channelInfo = document.getElementById(channelInfoName);
const channelJoinLeaveButton = document.getElementById(channelJoinLeaveButtonName);
const allChannels = document.getElementsByClassName(channelClassName);
const channelMessageList = document.getElementById(channelMessageListName);
const slackrTitle = document.getElementById(slackrTitleName);
const channelsListTitle = document.getElementById(channelsListTitleName);
const messageInputSubmitButton = document.getElementById(messageInputSubmitName);
const messageInputFileButton = document.getElementById(messageInputImageName);
const removeFileButton = document.getElementById(removeFileButtonName);
const showPinnedMessagesButton = document.getElementById(showPinnedMessagesButtonName);
const showChannelInfoButton = document.getElementById(showChannelInfoButtonName);
const inviteUsersButton = document.getElementById(inviteUsersButtonName);
const editProfileButton = document.getElementById(editProfileInfoButtonName);
const showPreviousMessages = document.getElementById(showPreviousMessagesName);
const showNextMessages = document.getElementById(showNextMessagesName);
const messagePageNumber = document.getElementById(messagePageNumberName);
const logoutButton = document.getElementById(logoutButtonName);
const loginForm = document.getElementById(loginFormName);
const registerForm = document.getElementById(registerFormName);
const messageInput = document.getElementById(messageInputName);
const messageInputImage = document.getElementById(messageInputName);
const inviteOthersUsersButton = document.getElementById(inviteUsersButtonName);

export function resizeHomePage() {

    let desiredHomePageHeight = (window.innerHeight - slackrTitle.offsetHeight).toString();
    desiredHomePageHeight += "px";
    homeScreen.style.height = desiredHomePageHeight;

    let desiredChannelsListHeight = (window.innerHeight - slackrTitle.offsetHeight - channelsListTitle.offsetHeight).toString();
    desiredChannelsListHeight += "px";
    channelsSection.style.height = desiredChannelsListHeight
    let desiredChannelWidth = channelsList.offsetWidth;
    desiredChannelWidth += "px";
    for (const channel of allChannels) {
        channel.style.width= desiredChannelWidth;
    }

    let desiredChannelScreenWidth = channelScreen.offsetWidth;
    desiredChannelScreenWidth += "px";
    channelNameOnScreen.style.width = desiredChannelScreenWidth;

    let desiredChannelScreenHeight = channelScreen.offsetHeight - 120 - channelNameOnScreen.offsetHeight;
    desiredChannelScreenHeight += "px";
    channelMessageList.style.height = desiredChannelScreenHeight;

    let desiredChooseFileButtonMarginTop = (channelNameOnScreen.offsetHeight + 37).toString();
    desiredChooseFileButtonMarginTop += "px";
    inviteUsersButton.style.top = desiredChooseFileButtonMarginTop;
    editProfileButton.style.top = desiredChooseFileButtonMarginTop;

    let desiredSubmitButtonMarginTop = (channelNameOnScreen.offsetHeight + 65).toString();
    desiredSubmitButtonMarginTop += "px";
    messageInputFileButton.style.top = desiredSubmitButtonMarginTop;
    removeFileButton.style.top = desiredSubmitButtonMarginTop;

    let desiredInviteButtonMarginTop =  (channelNameOnScreen.offsetHeight + 90).toString();
    desiredInviteButtonMarginTop += "px";
    showPinnedMessagesButton.style.top = desiredInviteButtonMarginTop;
    messageInputSubmitButton.style.top = desiredInviteButtonMarginTop;
    showChannelInfoButton.style.top = desiredInviteButtonMarginTop;

    let messagePageNumberMarginTop = (channelNameOnScreen.offsetHeight + 81).toString();
    messagePageNumberMarginTop += "px";
    messagePageNumber.style.top = messagePageNumberMarginTop;

    let messagePageNumberMarginLeft = (channelScreen.offsetWidth/2).toString();
    messagePageNumberMarginLeft += "px";
    messagePageNumber.style.left = messagePageNumberMarginLeft;

    let desiredShowNextMessagesMarinTop = (channelNameOnScreen.offsetHeight + 115).toString();
    desiredShowNextMessagesMarinTop += "px";
    showPreviousMessages.style.top = desiredShowNextMessagesMarinTop;
    showNextMessages.style.top = desiredShowNextMessagesMarinTop;

    let showPinnedMessagesButtonMarginLeft = (channelsPanel.offsetWidth + 100).toString();
    showPinnedMessagesButtonMarginLeft += "px";
    showPinnedMessagesButton.style.left =  showPinnedMessagesButtonMarginLeft;

    let desiredChannelFormValueWidth = channelInfo.offsetWidth;
    desiredChannelFormValueWidth += "px";
    channelInfoNameValue.style.width = desiredChannelFormValueWidth;
    channelInfoDescriptionValue.style.width = desiredChannelFormValueWidth;
    channelInfoChannelTypeValue.style.width = desiredChannelFormValueWidth;
    channelInfoCreationTimestampValue.style.width = desiredChannelFormValueWidth;
}

function showChannelInfo(leftChannel) {
    channelInfo.style.display = visible;
    const requestOptions = {
        method: 'GET',
        headers: {'Content-Type': 'application/json', 'Authorization': localStorage.getItem('user')},
    }

    const channelIdUrl = "http://localhost:5005/channel/" + currentChannel;
    fetch(channelIdUrl, requestOptions).then((response) => {
        if (response.status !== 200) {
            channelInfoNameValue.innerText = joinChannelMessage;
            channelInfoDescriptionValue.innerText = "";
            channelInfoChannelTypeValue.innerText = "";
            channelInfoCreationTimestampValue.innerText = "";
            channelInfoCreatorValue.innerText = "";
            updateChannelInfoButton.style.display = none;
            channelJoinLeaveButton.innerText = "Join";
            if (!leftChannel) {
                showPopup(notChannelMemberMessage);
            } else {
                showPopup(successfulLeaveChannelMessage);
            }    
        } else {
            response.json().then((data) => {
                updateChannelInfoButton.style.display = visible;
                channelJoinLeaveButton.innerText = "Leave";
                channelInfoNameValue.innerText = "Name: " + data.name;
                channelInfoDescriptionValue.innerText = "Description: " + data.description;

                let channelType = "Public";
                if (data.private) {
                    channelType = "Private";
                }

                channelInfoChannelTypeValue.innerText = "Channel Type: " + channelType;
                channelInfoCreationTimestampValue.innerText = "Creation timestamp: " + new Date(data.createdAt).toString();
                
                const requestOptions = {
                    method: 'GET',
                    headers: {'Content-Type': 'application/json',
                               'Authorization': localStorage.getItem('user')},
                }

                const userIdUrl = "http://localhost:5005/user/" + data.creator.toString();
                fetch(userIdUrl, requestOptions).then((response) => {
                    if (response.status !== 200) {
                        showPopup(response.text);
                    } else {
                        response.json().then((data) => {
                            channelInfoCreatorValue.innerText = "Creator: " + data.name;
                        })
                    }
                })
            })
        }
    }).catch((error) => {
        showPopup(error);
    })
    resizeHomePage();
}

export function displayHomeScreen() {
    homeScreen.style.display = visible;
    logoutButton.style.display = visible;

    const userToken = localStorage.getItem('user');
    const header = new Headers();
    header.append('Authorization', userToken)
    const requestOptions = {
        method: 'GET',
        headers: header,
    }
    fetch("http://localhost:5005/channel", requestOptions).then((response) => {
        if (response.status === 403) {
            showPopup(response.statusText);
        } else if (response.status === 200) {
            response.json().then((data) => {
                while (channelsSection.firstChild) {
                    channelsSection.removeChild(channelsSection.lastChild);
                }
                for (const channel of data.channels) {
                    
                    const element = document.createElement("div");
                    element.classList.add('channel');
                    if (channel.private) {
                        element.innerText = " P     " + channel.name;
                    } else {
                        element.innerText = " #     " + channel.name;
                    }
                    element.style.marginTop = "10px";
                    element.style.color = "#c8c8c8"
                    element.addEventListener('click', () => {
                        channelNameOnScreen.innerText = channel.name;
                        currentChannel = channel.id.toString();
                        loadMessages(currentChannel);
                    });
                    channelsSection.appendChild(element);
                }
            });
        }
    }).catch((error) => {
        showPopup(error);
    })
    resizeHomePage();
}

const addChannelButtonName = "add-channels-button";
const channelFormName = "channel-form";
const channelForm = document.getElementById(channelFormName);
const addChannelButton = document.getElementById(addChannelButtonName);
addChannelButton.addEventListener('click', () => {
    channelForm.style.display = visible;
    displayHomeScreen();
    disableBackgroundEnableModalMode();
});

//close button on channel form

const closeChannelFormButtonName = "close-channel-form-button";
const closeChannelFormButton = document.getElementById(closeChannelFormButtonName);
closeChannelFormButton.addEventListener('click', () => {
    channelForm.style.display = none;
    reenableBackgroundDisableModalMode();
});

//channel name on form

const channelNameInputName = "channel-form-name";
const channelNameInput = document.getElementById(channelNameInputName);

//channel description on form

const channelInputDescriptionName = "channel-form-description";
const channelInputDescription = document.getElementById(channelInputDescriptionName);

//channel type on form
const channelInputTypeName = "channel-form-type";
const channelInputType = document.getElementById(channelInputTypeName);

//channel form create button

const channelInputCreateButtonName = "channel-form-create-button";
const channelInputCreateButton = document.getElementById(channelInputCreateButtonName);
channelInputCreateButton.addEventListener('click', () => {
    if(channelNameInput.value === '') {
        showPopup(invalidNameMessage);
    } else {
        const channelType = channelInputType.options[channelInputType.selectedIndex];
        let isChannelPrivate = true;
        if (channelType.value != privateChannel) {
            isChannelPrivate = false;
        }
        const jsonString = JSON.stringify({
            name: channelNameInput.value,
            private: isChannelPrivate,
            description: channelInputDescription.value,
        });
    
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json',
                       'Authorization': localStorage.getItem('user')},
            body: jsonString,
        }

        fetch("http://localhost:5005/channel", requestOptions).then((response) => {
            if (response.status != 200) {
                showPopup(response.text);
            } else {
                showPopup(channelCreatedMessage);
                channelForm.style.display = none;
                displayHomeScreen();
            }
        }).catch((error) => {
            showPopup(error);
        })
    }
});

logoutButton.addEventListener('click', () => {
    const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem('user')},
    }

    fetch("http://localhost:5005/auth/logout", requestOptions).then((response) => {
        if (response.status !== 200) {
            showPopup(logoutError);
        } else {
            response.json().then((data) => {
                showPopup(successfulLogout);
                homeScreen.style.display = none;
                logoutButton.style.display = none;
                loginForm.style.display = visible;
                
                while (channelMessageList.firstChild) {
                    channelMessageList.removeChild(channelMessageList.lastChild);
                }

                messageInput.style.display = none;
                messageInputImage.style.display = none;
                messageInputSubmitButton.style.display = none;
                messageInputFileButton.style.display = none;
                removeFileButton.style.display = none;
                showPinnedMessagesButton.style.display = none;
                showChannelInfoButton.style.display = none;
                inviteOthersUsersButton.style.display = none;
                showNextMessages.style.display = none;
                showPreviousMessages.style.display = none;
                messagePageNumber.style.display = none;
            });
        }
    }).catch((error) => {
        showPopup(error);
    });
});


window.addEventListener('resize', ()=> {
    resizeHomePage();
});

removeFileButton.addEventListener('click', () => {
    messageInputFileButton.value = '';
});

const closeChannelInfoButton = document.getElementById(closeChannelInfoButtonName);
closeChannelInfoButton.addEventListener('click', () => {
    channelInfo.style.display = none;
    reenableBackgroundDisableModalMode();
});

showChannelInfoButton.addEventListener('click', () => {
    showChannelInfo(false);
    disableBackgroundEnableModalMode();
});

const updateChannelInfoForm = document.getElementById(updateChannelInfoFormName);
const updateChannelInfoButton = document.getElementById(updateChannelInfoButtonName);
const newChannelInfoDescription = document.getElementById(newChannelInfoDescriptionName);
const newChannelInfoName = document.getElementById(newChannelInfoNameName);
updateChannelInfoButton.addEventListener('click', () => {
    updateChannelInfoForm.style.display = visible;
});

const submitNewChannelInfoButton = document.getElementById(submitNewChannelInfoName);
submitNewChannelInfoButton.addEventListener('click', () => {

    const jsonString = JSON.stringify({
        name: newChannelInfoName.value,
        description: newChannelInfoDescription.value,
    });

    const requestOptions = {
        method: 'PUT',
        headers: {'Content-Type': 'application/json', 'Authorization': localStorage.getItem('user')},
        body: jsonString,
    }
    const channelIdUrl = "http://localhost:5005/channel/" + currentChannel;
    fetch(channelIdUrl, requestOptions).then((response) => {
        if (response.status !== 200) {
            showPopup(response.text);
        } else {
            channelNameOnScreen.innerText = newChannelInfoName.value;
            displayHomeScreen();
        }
    }).catch((error) => {
        showPopup(error);
    })
});

const closeUpdateChannelInfoButton = document.getElementById(closeUpdateChannelInfoButtonName);
closeUpdateChannelInfoButton.addEventListener('click', () => {
    showChannelInfo(false);
    updateChannelInfoForm.style.display = none;
});

channelJoinLeaveButton.addEventListener('click', () => {
    const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json', 'Authorization': localStorage.getItem('user')},
    }

    if (channelJoinLeaveButton.innerHTML === "Join") {
        const joinChannelUrl = "http://localhost:5005/channel/" + currentChannel + "/join";
        fetch(joinChannelUrl, requestOptions).then((response) => {
            if (response.status !== 200) {
                showPopup(cannotJoinPrivateChannelMessage);
            } else {
                showPopup(successfulJoinChannelMessage);
                showChannelInfo(false);
                channelJoinLeaveButton.innerHTML = "Leave";
            }
        }).catch((error) => {
            showPopup(error);
        })
    } else {
        const leaveChannelUrl = "http://localhost:5005/channel/" + currentChannel + "/leave";
        fetch(leaveChannelUrl, requestOptions).then((response) => {
            if (response.status !== 200) {
                showPopup(response.text);
            } else {
                showChannelInfo(true);
                showPopup(successfulLeaveChannelMessage);
                channelJoinLeaveButton.innerHTML = "Join";
            }
        }).catch((error) => {
            showPopup(error);
        })
    }
})

