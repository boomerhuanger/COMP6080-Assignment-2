import { showPopup } from "./register_and_login.js";
import { resizeHomePage } from "./channels.js";
import { fileToDataUrl } from "./helpers.js";
import { disableBackgroundEnableModalMode, reenableBackgroundDisableModalMode } from "./multiuser.js";

let messages = [];
let promiseArray = [];
let allSentImages = [];
let messagesOnScreen = [];
let pinnedMessages = [];
let index = 0;
let currentImageModalImageId = 0;
let messageSender = 'A';
let channel = 0;
let messageToEditId = '0';
let currentPageNumber = 0;
let lastMessageIdOnScreen = 0;
const none = 'none';
const visible = 'block';
const channelScreenInfoName = "channel-screen-info";
const channelMessageListName = "channel-message-list";
const messageSenderNameName = "message-sender-name";
const messageSenderPhotoName = "message-sender-photo";
const messageSenderTimestampName = "message-sender-timestamp";
const channelScreenName = "channels-screen";
const messageCardName = "message-card";
const messageTextName = "message-text";
const notChannelMemberMessage = "Not a channel member!";
const messageInputName = "channel-message-input";
const messageInputImageName = "channel-message-input-image";
const messageInputSubmitName = "channel-message-input-submit";
const messageInputSentPhotoName = "message-sent-photo";
const removeFileButtonName = "remove-file-button";
const deleteMessageButtonName = "delete-message-button";
const editMessageButtonName = "edit-message-button"
const successfullyDeletedMessage = "Successfully deleted!"
const emptyMessagePopup = "Empty message";
const cannotDeleteMessagePopup = "Cannot delete message";
const updateMessageFormName = "update-message-form";
const closeMessageInfoButtonName = "close-message-info-button";
const editMessageFormMessageImageName = "new-message-image";
const editMessageFormMessageTextName = "new-message-text";
const submitEditMessageFormName = "submit-new-message-info";
const showChannelInfoButtonName = "show-channel-info";
const imageInImageModalName = "image-in-image-modal";
const pinnedCheckboxName = "pin-checkbox";
const showPinnedMessagesButtonName = "show-pinned-messages";
const inviteUsersButtonName = "invite-users";
const userProfileInfoName = "user-profile-info";
const closeUserProfileInfoName = "close-user-profile-info";
const imageModalName = "image-modal";
const closeImageModalName = "close-image-modal";
const showPinnedState = "Show pinned";
const showAllMessageState = "Show all";
const cannotReactMessage = "Cannot react";
const cannotUnreactMessage = "Cannot unreact"
const cannotPinMessage = "Cannot pin";
const cannotUnpinMessage = "Cannot unpin";
const emojiOneName = "emoji-1";
const emojiOneCountName = "emoji-1-count";
const emojiTwoName = "emoji-2";
const emojiTwoCountName = "emoji-2-count";
const emojiThreeName = "emoji-3";
const emojiThreeCountName = "emoji-3-count";
const cannotEditMessage = "Cannot edit message";
const editProfileInfoButtonName = "show-profile-info";
const messagesLoaded = "Messages loaded!"
const messagesLoading = "Messages loading..."
const cannotEditSameMessage = "New message is the same as before!";
const imageModalLeftButtonName = "image-modal-left";
const imageModalRightButtonName = "image-modal-right"
const showPreviousMessagesName = "show-previous-messages"
const showNextMessagesName = "show-next-messages";
const messagePageNumberName = "message-page-number"
const noMorePreviousMessages = "No more previous messages";
const noMoreRemainingMessages = "No more remaining messages";
const defaultImage = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAM1BMVEXk5ueutLeqsbTn6eqpr7PJzc/j5ebf4eLZ3N2wtrnBxsjN0NLGysy6v8HT1tissra8wMNxTKO9AAAFDklEQVR4nO2d3XqDIAxAlfivoO//tEOZWzvbVTEpic252W3PF0gAIcsyRVEURVEURVEURVEURVEURVEURVEURVEURVEURflgAFL/AirAqzXO9R7XNBVcy9TbuMHmxjN6lr92cNVVLKEurVfK/zCORVvW8iUBnC02dj+Wpu0z0Y6QlaN5phcwZqjkOkK5HZyPAjkIjSO4fIdfcOwFKkJlX4zPu7Ha1tIcwR3wWxyFhRG6g4Je0YpSPDJCV8a2Sv2zd1O1x/2WMDZCwljH+clRrHfWCLGK8REMiql//2si5+DKWKcWeAGcFMzzNrXC/0TUwQ2s6+LhlcwjTMlYsUIQzPOCb7YBiyHopyLXIEKPEkI/TgeuiidK/R9FniUDOjRDpvm0RhqjMyyXNjDhCfIMYl1gGjIMIuYsnGEYRMRZOMMunaLVwpWRW008v6fYKDIzxCwVAeNSO90BJW6emelYBRF/kHpYGVaoxTDAaxOFsfP9y8hpJ4xd7gOcij7JNGQ1EYFgkPJa1jQEiYZXRaRINKxSDUW9n+FT82lSKadkiru9/4XPqSLWOekGPoY05TAvLm9orm+YWuwHoBHkZKijNBJGmeb61eL6Ff/6q7bLr7yvv3vKGhpDRjvgjGaPz+gUg6YgcvpyAR2FIZ9U6nEEyZRTovmEU32KichpGn7C17XrfyH9gK/c0CMP05HZIM2uf9sEveizKveBy9/6Qt7o89ne33D525cfcIMW6ab+TMEukQbQbu+xu7X3A9bChmWaCeAkG17bpntwXgWxHaMzGPmUaR5dQZiKqRVeUZ3047fi3nAu28h4CHxCsZAgmEH8Y27jJAhm8c+5RQzRQNVGhVFSfxOYIjp/pP7RxzjevYXVGf4eLt+BJ1vCuLuLkrgABgCGXZ2wik5uty+oBvNirI6mkzhAf4Gsb58Hcm67Jzd+KwD10BYPLL3e0MjvKrgAULnOfveF/O4N2Xb9BZom3gJes3F9X5Zze8/6Yt09b4CrqsEjUv8oFBaR2rl+6CZr2xVrp24o/WitBKuGrrpl1+bFkmK2qXTON4VpbdfLa7o7y/WdLxG7lm2Lqh2clOwTegbvc/vj2U78CwhA87Bn8G5Nk3eOb0Nsr9flz3sG78UUtue4kpv1xvjg3TMay62BMlTlP+vrOMnJsRmt/ze0jsfkPPYdAH57hK+34PeOyc8XIXu5xT2HsUkdZz+adwg8HGFfQ3K5jtDvbUiO4Di9/ywHGrL88pDizZ++oTp+an+SMX/ndymUCwmHMdO7yuOx83pUx/eEMU0AvxWndwgidAqOZ8ypCwdEfvvEo6D9HwpA8wzvmOJEqAg9ySu8g4x0Hb9hSB/BANEKJ+LbPBU0lzbAJs4xt1AoshKkUGQmiH8/jJ0gdhTTLmSegHlPE0oOdXALnqDjKYh3px//fSgSWG8UqfrrIICzYYSJXRr9BSPbpNzw7gBjKjKOYI7ReIGqQRIap5+5MdjyvuDkExvGeXSlONWZAP3/AZBwJohU7QJRGU+cTVH18ELmRPNBmibW6MT/k1b0XhdkRBvyT6SB6EYv/GvhSmRNpGngRULsAlxMCGNXp7w3FfdEbTEEDdLI9TdIKRUzUesa3I461ER8cpNT7gMRhpKmYVS9ELOgCUQsa4SsulciKiLbY+AnHD8cpuhISsnxpamI84sbDq9qYJgf8wiiOBrC7Ml7M7ZECCqKoiiKoiiKoiiKoijv5AvJxlZRyNWWLwAAAABJRU5ErkJggg==";
const channelScreen = document.getElementById(channelScreenName);
const channelMessageList = document.getElementById(channelMessageListName);
const channelScreenInfo = document.getElementById(channelScreenInfoName);
const messageSenderName = document.getElementById(messageSenderNameName);
const messageSenderPhoto = document.getElementById(messageSenderPhotoName);
const messageSenderTimeStamp = document.getElementById(messageSenderTimestampName);
const messageCard = document.getElementById(messageCardName);
const messageText = document.getElementById(messageTextName);
const messageInput = document.getElementById(messageInputName);
const messageInputImage = document.getElementById(messageInputName);
const messageInputSubmitButton = document.getElementById(messageInputSubmitName);
const messageInputFileButton = document.getElementById(messageInputImageName);
const messageInputSentPhoto = document.getElementById(messageInputSentPhotoName);
const removeFileButton = document.getElementById(removeFileButtonName);
const editMessageButton = document.getElementById(editMessageButtonName);
const editMessageForm = document.getElementById(updateMessageFormName);
const closeEditMessageFormButton = document.getElementById(closeMessageInfoButtonName);
const editMessageFormMessageImage = document.getElementById(editMessageFormMessageImageName);
const editMessageFormMessageText = document.getElementById(editMessageFormMessageTextName);
const submitEditMessageForm = document.getElementById(submitEditMessageFormName);
const showPinnedMessagesButton = document.getElementById(showPinnedMessagesButtonName);
const showChannelInfoButton = document.getElementById(showChannelInfoButtonName);
const inviteOthersUsersButton = document.getElementById(inviteUsersButtonName);
const userProfileInfo = document.getElementById(userProfileInfoName);
const closeUserProfileInfo = document.getElementById(closeUserProfileInfoName);
const editProfileButton = document.getElementById(editProfileInfoButtonName);
const imageModal = document.getElementById(imageModalName);
const closeImageModalButton = document.getElementById(closeImageModalName);
const imageModalLeftButton = document.getElementById(imageModalLeftButtonName);
const imageModalRightButton = document.getElementById(imageModalRightButtonName);
const imageInImageModal = document.getElementById(imageInImageModalName);
const showPreviousMessages = document.getElementById(showPreviousMessagesName);
const showNextMessages = document.getElementById(showNextMessagesName);
const messagePageNumber = document.getElementById(messagePageNumberName);

export function getUserInfo(userId) {
    const obtainMessageUrl = "http://localhost:5005/user/" + userId.toString();

    const requestOptions = {
        method: 'GET',
        headers: {'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem('user')},
    }

    return fetch(obtainMessageUrl, requestOptions).then((res) => {
        if (res.status !== 200) {
            showPopup(res.statusText);
        } else {
            return res.json().then((data) => {
                return data;
            })
        }
    }).catch((error) => {
        showPopup(error);
    })
}

function makeNewMessageResponsive(newMessage) {
    let imagePadding = 116;
    if (newMessage.children[4].children[0].offsetHeight > 0) {
        imagePadding = 74;
    }

    let desiredNewMessageHeight = (newMessage.children[0].offsetHeight + 
        newMessage.children[1].offsetHeight + 
        newMessage.children[2].offsetHeight + newMessage.children[4].children[0].offsetHeight + imagePadding).toString();
    desiredNewMessageHeight += "px";
    newMessage.style.height = desiredNewMessageHeight;

    let desiredMessageImageBottom = (newMessage.children[0].offsetHeight + 
        newMessage.children[1].offsetHeight + newMessage.children[2].offsetHeight).toString();
    desiredMessageImageBottom += "px";
    newMessage.children[4].children[0].style.top= desiredMessageImageBottom;

    let desiredTimeStampWidth = (channelMessageList.offsetWidth - 80).toString();
    desiredTimeStampWidth += "px";

    newMessage.children[0].style.width = desiredTimeStampWidth;
    newMessage.children[1].style.width = desiredTimeStampWidth;
    newMessage.children[2].style.width = desiredTimeStampWidth;

    let desiredSenderNameMarginTop = newMessage.children[0].offsetHeight.toString();
    desiredSenderNameMarginTop += "px";
    newMessage.children[1].style.top = desiredSenderNameMarginTop;
    let desiredMessageTextMarginTop = (newMessage.children[0].offsetHeight + newMessage.children[1].offsetHeight).toString();
    desiredMessageTextMarginTop += "px";
    newMessage.children[2].style.top = desiredMessageTextMarginTop;

    newMessage.scrollIntoView();
}

function makeMessageResponsive(message) {
    let desiredMessageTimeStampWidth = (channelMessageList.offsetWidth - 80).toString();
    desiredMessageTimeStampWidth += "px";
    message.children[0].style.width = desiredMessageTimeStampWidth;
    message.children[1].style.width = desiredMessageTimeStampWidth;
    message.children[2].style.width = desiredMessageTimeStampWidth;
    let desiredMessageImageBottom = (message.children[0].offsetHeight + 
        message.children[1].offsetHeight + message.children[2].offsetHeight).toString();
    desiredMessageImageBottom += "px";
    message.children[4].children[0].style.top= desiredMessageImageBottom;

    let imagePadding = 116;
    if (message.children[4].children[0].offsetHeight > 0) {
        imagePadding = 74;
    }

    let desiredNewMessageHeight = (message.children[0].offsetHeight + 
        message.children[1].offsetHeight + 
        message.children[2].offsetHeight + message.children[4].children[0].offsetHeight + imagePadding).toString();
    desiredNewMessageHeight += "px";
    message.style.height = desiredNewMessageHeight;

    let desiredMessageInputFieldWidth = (channelScreen.offsetWidth - 100).toString();
    desiredMessageInputFieldWidth += 'px';
    messageInput.style.width = desiredMessageInputFieldWidth

    let desiredSenderNameMarginTop = message.children[0].offsetHeight.toString();
    desiredSenderNameMarginTop += "px";
    message.children[1].style.top = desiredSenderNameMarginTop;
    let desiredMessageTextMarginTop = (message.children[0].offsetHeight + message.children[1].offsetHeight).toString();
    desiredMessageTextMarginTop += "px";
    message.children[2].style.top = desiredMessageTextMarginTop;
}

function createNewMessage(name, sentPhoto, newMessage, newMessageText, senderImage) {

    const profilePic = newMessage.getElementById(messageSenderPhotoName);
    const editButton = newMessage.getElementById("edit-message-button");

    if (senderImage === null) {
        profilePic.src = defaultImage;
    } else {
        profilePic.src = senderImage;
    }

    const timestamp = newMessage.getElementById(messageSenderTimestampName);
    timestamp.innerText = new Date().toLocaleString();
    const messageText = newMessage.getElementById(messageTextName);
    messageText.innerText = newMessageText;
    const sender = newMessage.getElementById(messageSenderNameName);
    sender.innerText = name;

    let desiredMessageWidth = (channelMessageList.offsetWidth - 95).toString();
    desiredMessageWidth += "px";

    timestamp.style.width = desiredMessageWidth;
    messageText.style.width = desiredMessageWidth;
    sender.style.width = desiredMessageWidth;

    newMessage.children[0].style.height = (timestamp.offsetHeight + 
        sender.offsetHeight  + 
        messageText.offsetHeight + sentPhoto.offsetHeight + 54).toString() + "px";

    newMessage.children[0].style.width = (channelScreen.offsetWidth).toString();
    newMessage.children[0].style.display = none;
    channelMessageList.appendChild(newMessage);
}

function sendMessage(newMessageText, requestOptions, name, sentPhoto, imageUri, newMessageImage, newMessage, senderImage) {
    const sendMessageUrl = "http://localhost:5005/message/" + channel.toString();
    new Promise((resolve, reject) => {
        fetch(sendMessageUrl, requestOptions).then((res) => {
            if (res.status !== 200) {
                showPopup(res.statusText);
            } else {
                res.json().then((data) => {
                    if (typeof newMessageImage !== "undefined") {
                        sentPhoto.src = imageUri;
                        sentPhoto.style.width = "100px";
                        sentPhoto.style.height = "100px";
                    }
                    createNewMessage(name, sentPhoto, newMessage, newMessageText, senderImage);
                    resolve();
                })
            }
        }).catch((error) => {
            showPopup(error);
        })
    }).then(() => {
        const newMessage = channelMessageList.children[channelMessageList.children.length - 1];
        //lastMessageIdOnScreen = newMessage.id;
        window.addEventListener('resize', () => {
            makeNewMessageResponsive(newMessage);
        });    
        makeNewMessageResponsive(newMessage);
        window.dispatchEvent(new Event('resize'));
        newMessage.scrollIntoView()
        
        const totalMessagesLength = document.getElementsByClassName(messageCardName).length;
        const totalPages = Math.floor(totalMessagesLength / 25) + 1;

        if (currentPageNumber < totalPages && totalPages % 25 != 0) {
            let i = currentPageNumber;
            while (i <= currentPageNumber) {
                showNextMessagesHandler();
                i += 1;
            }
        } 

        newMessage.style.display = visible;
        window.dispatchEvent(new Event('resize'));

    }).catch((error) => {
        showPopup(error);
    })
}

function handleDeleteMessage(deleteButton, messageId, message) {
    deleteButton.addEventListener('click', () => {
        const removeMessageUrl = "http://localhost:5005/message/" + channel.toString() + "/" + messageId.toString();
        const requestOptions = {
            method: 'DELETE',
            headers: {'Content-Type': 'application/json',
                        'Authorization': localStorage.getItem('user')},
        }
        fetch(removeMessageUrl, requestOptions).then((res) => {
            if (res.status !== 200) {
                showPopup(cannotDeleteMessagePopup);
            } else {
                res.json().then((data) => {
                    showPopup(successfullyDeletedMessage);
                    message.remove(); 
                    
                    const messages = document.getElementsByClassName(messageCardName);
                    const totalMessagesLength = messages.length;
                    const totalPages = Math.floor(totalMessagesLength / 25) + 1;

                    if (totalMessagesLength % 25 == 0 && totalMessagesLength != 0) {
                        lastMessageIdOnScreen = messages[messages.length - 1].id;
                        showPreviousMessagesHandler();
                    }
                })
            }
        }).catch((error) => {
            showPopup(error);
        })
    })
}

function handleEditMessage(editButton) {
    editButton.addEventListener("click", () => {
        editMessageForm.style.display = visible;
        messageToEditId = editButton.name;
    })
}

function editMessage() {

    let editMessageImage;
    if (editMessageFormMessageImage.files.length > 0) {
        editMessageImage = fileToDataUrl(editMessageFormMessageImage.files[0]);
    }

    const editMessageText = editMessageFormMessageText.value;
    editMessageFormMessageImage.value = '';
    const currentUserId = localStorage.getItem('userId').toString();

    new Promise((resolve, reject) => {
        getUserInfo(currentUserId).then((data) => {
            resolve(data.name);
        }).catch((error) => {
            showPopup(error);
        })
    }).then((name) => {
        let jsonString = JSON.stringify({
            message: editMessageText,
        });

        const messageToEdit = document.getElementById(messageToEditId.toString());
        const editMessageUrl = "http://localhost:5005/message/" + channel.toString() + "/" + messageToEditId.toString();

        if (typeof editMessageImage !== "undefined") {
            editMessageImage.then((imageUri) => {
                jsonString = JSON.stringify({
                    message: editMessageText,
                    image: imageUri,
                });
    
                for (const photo of allSentImages) {
                    if (photo.id === parseInt(messageToEditId)) {
                        photo.image = imageUri;
                        handleImageModal(messageToEdit);
                    }
                }

                const requestOptions = {
                    method: 'PUT',
                    headers: {'Content-Type': 'application/json',
                            'Authorization': localStorage.getItem('user')},
                    body: jsonString,
                }
                fetch(editMessageUrl, requestOptions).then((res) => {
                    if (res.status !== 200) {
                        showPopup(cannotEditMessage);
                    } else {
                        res.json().then((data) => {
                            messageToEdit.children[2].innerText = editMessageText;
                            messageToEdit.children[4].children[0].src = imageUri;
                            messageToEdit.children[4].children[0].style.height = "100px";
                            messageToEdit.children[4].children[0].style.width = "100px";
                            messageToEdit.children[0].innerText = new Date().toLocaleString();
                            makeNewMessageResponsive(messageToEdit);
                        })
                    }
                }).catch((error) => {
                    showPopup(error);
                })
            })
        } else {
            const requestOptions = {
                method: 'PUT',
                headers: {'Content-Type': 'application/json',
                        'Authorization': localStorage.getItem('user')},
                body: jsonString,
            }
            fetch(editMessageUrl, requestOptions).then((res) => {
                if (res.status !== 200) {
                    showPopup(cannotEditMessage);
                } else {
                    res.json().then((data) => {
                        messageToEdit.children[2].innerText = editMessageText;

                        if (messageToEdit.children[4].children[0].src == "") {
                            messageToEdit.children[4].children[0].style.display = none;
                        }

                        const originalTimeStamp = messageToEdit.children[0].innerText;
                        let originalTimeStampFormmated = originalTimeStamp; 

                        if (originalTimeStamp[0] === "O") {
                            originalTimeStampFormmated = originalTimeStamp.slice(17, 37);
                        } 

                        messageToEdit.children[0].innerText = "Originally sent: " + originalTimeStampFormmated + 
                        " (Edited: " + new Date().toLocaleString() + ")";
                        makeNewMessageResponsive(messageToEdit);
                    })
                }
            }).catch((error) => {
                showPopup(error);
            })
        }
    })
}

function sendNewMessage() {
    const newMessageText = messageInput.value;
    messageInput.value = '';
    
    if ((!newMessageText || !newMessageText.trim()) && (messageInputFileButton.value  === '')) {
        showPopup(emptyMessagePopup);
    } else {
        let newMessageImage;
        if (messageInputFileButton.files.length > 0) {
            newMessageImage = fileToDataUrl(messageInputFileButton.files[0]);
        }
        
        messageInputFileButton.value = '';
        const currentUserId = localStorage.getItem('userId').toString();

        new Promise((resolve, reject) => {
            getUserInfo(currentUserId ).then((data) => {
                resolve({name: data.name, image: data.image});
            }).catch((error) => {
                showPopup(error);
            })
        }).then((userInfo) => {
            let jsonString = JSON.stringify({
                message: newMessageText,
            });

            let newMessageTemplate = document.getElementById(channelScreenInfoName);
            let newMessage = newMessageTemplate.content.cloneNode(true);
            const sentPhoto = newMessage.getElementById(messageInputSentPhotoName);

            if (typeof newMessageImage !== "undefined") {
                newMessageImage.then((imageUri) => {
                    jsonString = JSON.stringify({
                        message: newMessageText,
                        image: imageUri,
                    });
        
                    const requestOptions = {
                        method: 'POST',
                        headers: {'Content-Type': 'application/json',
                                'Authorization': localStorage.getItem('user')},
                        body: jsonString,
                    }
                    sendMessage(newMessageText, requestOptions, userInfo.name, sentPhoto, imageUri, newMessageImage, newMessage, userInfo.image);
                })
            } else {
                const requestOptions = {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json',
                            'Authorization': localStorage.getItem('user')},
                    body: jsonString,
                }
                sendMessage(newMessageText, requestOptions, userInfo.name, sentPhoto, false, newMessageImage, newMessage, userInfo.image);
            }
        }).finally(() => {
            messages = [];
            promiseArray = [];
            index = 0;
            new Promise((resolve, reject) => {
                getMessages(true, channel, resolve, reject);
            }).then(() => {
                const newMessageId = messages[messages.length - 1][messages[messages.length - 1].length - 1].id;
                lastMessageIdOnScreen = newMessageId;
                const newMessage = channelMessageList.children[channelMessageList.children.length - 1];
                allSentImages.push({id: newMessageId, image:newMessage.children[4].children[0].src});
                const deleteButton = newMessage.children[5];
                const editButton = newMessage.children[6];
                editButton.name = newMessageId.toString();
                deleteButton.name = newMessageId.toString();
                newMessage.id = newMessageId;
                newMessage.children[1].classList.add(messages[messages.length - 1][messages[messages.length - 1].length - 1].sender);
                newMessage.children[7].classList.add(newMessageId.toString());
                newMessage.children[8].classList.add(newMessageId.toString());
                newMessage.children[9].classList.add(newMessageId.toString());
                newMessage.children[10].classList.add(newMessageId.toString());
                newMessage.children[11].classList.add(newMessageId.toString());
                newMessage.children[12].classList.add(newMessageId.toString());
                newMessage.children[13].name = newMessageId.toString();
                handleDeleteMessage(deleteButton, newMessageId, newMessage);
                handleUserProfile(newMessage);
                handleEditMessage(editButton);
                handleReacts(newMessage.children[7]);
                handleReacts(newMessage.children[8]);
                handleReacts(newMessage.children[9]);
                handleMessagePinning(newMessage);
                handleImageModal(newMessage);
            }).catch((error) => {
                showPopup(error);
            })
        }).catch((error) => {
            showPopup(error);
        })
    }
}


function handleUpdateEditMessage() {
    submitEditMessageForm.addEventListener('click', (event) => {
        event.preventDefault();
        const editMessageText = editMessageFormMessageText.value;
        const editMessageImage = editMessageFormMessageImage.value;
        const oldImage = document.getElementById(messageToEditId).children[4].children[0];
        const oldMessageText = document.getElementById(messageToEditId).children[2].innerText;
        const emptyImage = "http://"+ window.location.host + "/";

        let image;
        if (editMessageFormMessageImage.files.length > 0) {
            image = fileToDataUrl(editMessageFormMessageImage.files[0]);
        }

        if (typeof image !== "undefined") {
            image.then((imageUri) => {
                if ((oldMessageText === editMessageText) && (oldImage.src === imageUri)) {
                    showPopup(cannotEditSameMessage);  
                } else {
                    editMessage();
                }
            })
        } else {
            if ((!editMessageText || !editMessageText.trim()) && (editMessageText  === '')) {
                showPopup(emptyMessagePopup);
            } else if ((oldMessageText === editMessageText) && (oldImage.height === 0)) {
                showPopup(cannotEditSameMessage); 
            } else {
                editMessage();
            }
        }
    })
}

function handleReacts(emoji) {
    emoji.addEventListener('click', () => {
        let emojiIndex = 0;
        if (emoji.id === emojiOneName) {
            emojiIndex = 3;
        } else if (emoji.id === emojiTwoName) {
            emojiIndex = 4;
        } else if (emoji.id === emojiThreeName) {
            emojiIndex = 5;
        }

        const emojiCount = document.getElementsByClassName(emoji.className)[emojiIndex];
        let originalCount = parseInt(emojiCount.innerText);
        const jsonString = JSON.stringify({
            react: emoji.id,
        });
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json',
                       'Authorization': localStorage.getItem('user')},
            body: jsonString,
        }
        if (emoji.style.backgroundColor !== 'blue') {
            const reactMessageUrl = "http://localhost:5005/message/react/" + channel.toString() + "/" + emoji.className.toString();
            fetch(reactMessageUrl, requestOptions).then((res) => {
                if (res.status !== 200) {
                    showPopup(cannotReactMessage);
                } else {
                    res.json().then((data) => {
                        emojiCount.innerText = (originalCount + 1).toString();
                        emoji.style.backgroundColor = 'blue';
                    })                
                }
            }).catch((error) => {
                showPopup(error);
            })
        } else {
            const reactMessageUrl = "http://localhost:5005/message/unreact/" + channel.toString() + "/" + emoji.className.toString();
            fetch(reactMessageUrl, requestOptions).then((res) => {
                if (res.status !== 200) {
                    showPopup(cannotUnreactMessage);
                } else {
                    res.json().then((data) => {
                        emoji.style.backgroundColor = 'lightblue'
                        emojiCount.innerText = (originalCount - 1).toString();
                    })                
                }
            }).catch((error) => {
                showPopup(error);
            })
        }
    })
}

closeEditMessageFormButton.addEventListener('click', () => {
    editMessageForm.style.display = none;
    editMessageFormMessageText.value = '';
    editMessageFormMessageImage.value = '';
}); 

closeImageModalButton.addEventListener('click', () => {
    imageModal.style.display = none;
    reenableBackgroundDisableModalMode();
})

messageInputSubmitButton.addEventListener('click', (event) => {
    event.preventDefault();
    sendNewMessage();
});   

let firstTime = false;

showPinnedMessagesButton.addEventListener('click', () => {
    let state;
    const allMessages = document.getElementsByClassName(messageCardName);

    for (const message of allMessages) {
        if (message.style.display == visible) {
            if (message.children[13].checked) {
                const index = pinnedMessages.findIndex(a => a.message == message);

                if (firstTime !== false) {
                    if (pinnedMessages[index].onCurrentPage == false) {
                        message.style.display = none;
                    }
                } else {   
                    if (pinnedMessages[index].onCurrentPage == false) {
                        pinnedMessages[index].onCurrentPage = true;
                    } 
                }
            } 

            if (message.style.display !== none) {
                messagesOnScreen.push(message);
            }
        }
    }

    firstTime = true;

    if (showPinnedMessagesButton.innerText === showPinnedState) {
        state = none;

        for (const message of allMessages) {
            message.style.display = none;
        }

        for (const message of pinnedMessages) {
            message.message.style.display = visible;
        }

        showPinnedMessagesButton.innerText = showAllMessageState;
    } else {
        state = visible;

        for (const message of messagesOnScreen) {
            message.style.display = visible;
        }



        showPinnedMessagesButton.innerText = showPinnedState;
    }
    window.dispatchEvent(new Event('resize'));
});

function handleMessagePinning(message) {
    const checkbox = message.children[13];
    checkbox.addEventListener('click', () => {
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json',
                       'Authorization': localStorage.getItem('user')},
        }
        let handleMessagePinningUrl;
        if (checkbox.checked) {
            handleMessagePinningUrl = "http://localhost:5005/message/pin/" + channel.toString() + "/" + checkbox.name.toString();
            pinnedMessages.push({onCurrentPage: false, message: message});
        } else {
            handleMessagePinningUrl = "http://localhost:5005/message/unpin/" + channel.toString() + "/" + checkbox.name.toString();
            pinnedMessages = pinnedMessages.filter(item => item.message != message);
        }
    
        fetch(handleMessagePinningUrl, requestOptions).then((res) => {
            if (res.status != 200) {
                showPopup(cannotPinMessage);
            } else {
                res.json().then(() => {
                    
                });
            }
        }).catch((error) => {
            showPopup(error);
        })
    })
}

closeUserProfileInfo.addEventListener('click', () => {
    userProfileInfo.style.display = none;
    reenableBackgroundDisableModalMode();
}) 

function handleUserProfile(message) {
    const userId = message.children[1].className;
    message.children[1].addEventListener('click', () => {
        getUserInfo(userId).then((userInfo) => {

            userProfileInfo.style.display = visible;
            userProfileInfo.children[0].children[0].innerText = "Profile Info";
            userProfileInfo.children[3].style.display = none;
            userProfileInfo.children[4].style.display = none;

            let i = 7;
            while (i <= 13) {
                userProfileInfo.children[i].style.display = none;
                i += 1;
            }

            if (userInfo.image != null) {
                userProfileInfo.children[1].children[0].src = userInfo.image;
            } else {
                userProfileInfo.children[1].children[0].src = defaultImage;
            }

           
            userProfileInfo.children[1].children[0].style.width = "125px";
            userProfileInfo.children[1].children[0].style.height= "125px";
            userProfileInfo.children[2].innerText =  "Name: " + userInfo.name;

            if (userInfo.bio != null) {
                userProfileInfo.children[6].innerText = "Bio: " + userInfo.bio;
            } else {
                userProfileInfo.children[6].innerText = "Bio: None available";
            }
            userProfileInfo.children[5].innerText = "Email: " + userInfo.email;
            disableBackgroundEnableModalMode();
        }).catch((error) => {
            showPopup(error);
        })
    });  
}

function handleImageModal(message) {
    let imageToDisplay;
    for (const image of allSentImages) {
        if (image.id == message.id) {
            imageToDisplay = image.image;
        }
    }

    const originalImage = document.createElement('img');
    originalImage.src = imageToDisplay;
    const originalImageWidth = originalImage.width;
    const originalImageHeight = originalImage.height;

    let imageHeightAsPercentage = ((100)/(1 + (originalImageWidth/originalImageHeight))).toString();
    let imageWidthAsPercentage = (100 - imageHeightAsPercentage).toString();
    let imageTopAsPercentage = (50 - imageHeightAsPercentage/2).toString();
    let imageLeftAsPercentage = ((100 - imageWidthAsPercentage)/2).toString();
    imageHeightAsPercentage += "%";
    imageWidthAsPercentage += "%";
    imageTopAsPercentage += "%";
    imageLeftAsPercentage += "%";

    for (const image of allSentImages) {
        if (image.id == message.id) {
            imageToDisplay = image.image;
            image.height = imageHeightAsPercentage;
            image.width = imageWidthAsPercentage;
            image.top = imageTopAsPercentage;
            image.left = imageLeftAsPercentage;
        }
    }

    message.children[4].children[0].addEventListener('click', () => {
        currentImageModalImageId = message.id;
        imageModal.style.display = visible;
        imageModal.children[0].style.width = imageWidthAsPercentage;
        imageModal.children[0].style.height = imageHeightAsPercentage;
        imageModal.children[0].style.top = imageTopAsPercentage;
        imageModal.children[0].style.left = imageLeftAsPercentage;
        imageModal.children[0].src = imageToDisplay;
        disableBackgroundEnableModalMode();
    });
}

imageModalLeftButton.addEventListener('click', () => {
    let i = 0;
    for (const photo of allSentImages) {
        if (photo.id == currentImageModalImageId) {
            if (i === 0) {
                imageInImageModal.src = allSentImages[allSentImages.length - 1].image;
                imageInImageModal.style.top = allSentImages[allSentImages.length - 1].top;
                imageInImageModal.style.width = allSentImages[allSentImages.length - 1].width;
                imageInImageModal.style.left = allSentImages[allSentImages.length - 1].left;
                imageInImageModal.style.height = allSentImages[allSentImages.length - 1].height;
                currentImageModalImageId = allSentImages[allSentImages.length - 1].id;
                break;
            } else {
                imageInImageModal.src = allSentImages[i - 1].image;
                imageInImageModal.style.top = allSentImages[i - 1].top;
                imageInImageModal.style.width = allSentImages[i - 1].width;
                imageInImageModal.style.left = allSentImages[i - 1].left;
                imageInImageModal.style.height = allSentImages[i - 1].height;
                currentImageModalImageId = allSentImages[i - 1].id;
            }
        }
        i += 1;
    }
})

imageModalRightButton.addEventListener('click', () => {
    let k = 0;
    for (const photo of allSentImages) {
        if (photo.id == currentImageModalImageId) {
            if (k == (allSentImages.length - 1)) {
                imageInImageModal.src = allSentImages[0].image;
                imageInImageModal.style.top = allSentImages[0].top;
                imageInImageModal.style.width = allSentImages[0].width;
                imageInImageModal.style.left = allSentImages[0].left;
                imageInImageModal.style.height = allSentImages[0].height;
                currentImageModalImageId = allSentImages[0].id;
            } else {
                imageInImageModal.src = allSentImages[k + 1].image;
                imageInImageModal.style.top = allSentImages[k + 1].top;
                imageInImageModal.style.width = allSentImages[k + 1].width;
                imageInImageModal.style.left = allSentImages[k + 1].left;
                imageInImageModal.style.height = allSentImages[k + 1].height;
                currentImageModalImageId = allSentImages[k + 1].id;
            }
            break;
        }
        k += 1;
    }
})

function showPreviousMessagesHandler() {
    const messages = document.getElementsByClassName(messageCardName);
    const totalMessagesLength = [].concat(...messages).length;
    let totalPages = Math.floor(totalMessagesLength / 25) + 1
    messagesOnScreen = [];

    if (totalMessagesLength % 25 === 0) {
        totalPages -= 1;
    }

    if (currentPageNumber === 1) {
        showPopup(noMorePreviousMessages);
    } else {
        
        let i = 0;
        let indexToStart = 0;
        for (const message of messages) {
            if (parseInt(message.id) == lastMessageIdOnScreen) {
                indexToStart = i - 25;
                break;
            }
            i += 1;
        }

        i = indexToStart - 1;
        let messagesOnLastPage = 0;

        if (currentPageNumber == totalPages) {
            let k = totalMessagesLength - 1;
            while (k >= 0) {
                if (messages[k].style.display == none) {
                    i = k;
                    indexToStart = i;
                    break;
                }
                messagesOnLastPage += 1;
                k -= 1;
            }
        } else {
            let a = 0;
            while (a < messages.length) {
                if (parseInt(messages[a].id) == lastMessageIdOnScreen) {
                    indexToStart = a;
                }
                a += 1;
            }
        }

        for (const message of messages) {
            message.style.display = none;
        }

        let j = 0;
        i = indexToStart;

        while (j < 25) {
            makeMessageResponsive(messages[i]);
            messages[i].style.display = visible;
            i -= 1;
            j += 1;
        }
        window.dispatchEvent(new Event('resize'));
        if (indexToStart - 24 >= 0) {
            lastMessageIdOnScreen = messages[indexToStart].id;
        }
        currentPageNumber -= 1;
    }
    window.dispatchEvent(new Event('resize'));
    messagePageNumber.innerText = currentPageNumber.toString() + "/" + totalPages;
}

showPreviousMessages.addEventListener('click', () => {
    showPreviousMessagesHandler();
});

function showNextMessagesHandler() {
    const messages = document.getElementsByClassName(messageCardName);
    const totalMessagesLength = [].concat(...messages).length;
    let totalPages = Math.floor(totalMessagesLength / 25) + 1
    messagesOnScreen = [];

    if (totalMessagesLength % 25 === 0) {
        totalPages -= 1;
    }

    if (currentPageNumber === totalPages) {
        showPopup(noMoreRemainingMessages);
    } else {
        for (const message of messages) {
            message.style.display = none;
        }

        let i = 0;
        let indexToStart = 0;
        for (const message of messages) {
            if (parseInt(message.id) == lastMessageIdOnScreen) {
                indexToStart = i;
                break;
            }
            i += 1;
        }

        i = indexToStart + 1;
        let j = 0;
        while (j < 25) {
            if (i >= totalMessagesLength) {
                lastMessageIdOnScreen = messages[totalMessagesLength - 1].id;
                break;
            }
            makeMessageResponsive(messages[i]);
            messages[i].style.display = visible;
            i += 1;
            j += 1;
        }

        if (indexToStart + 25 < totalMessagesLength) {
            lastMessageIdOnScreen = messages[i-1].id;
        }
        currentPageNumber += 1;
    }
    window.dispatchEvent(new Event('resize'));
    messagePageNumber.innerText = currentPageNumber.toString() + "/" + totalPages;
}

showNextMessages.addEventListener('click', () => {
    showNextMessagesHandler();
});


export function loadMessages(currentChannel) {
    channel = currentChannel;
    localStorage.setItem('channelId', currentChannel.toString());
    messages = [];
    promiseArray = [];
    allSentImages = [];
    messagesOnScreen = [];
    pinnedMessages = [];
    index = 0;
    while (channelMessageList.firstChild) {
        channelMessageList.removeChild(channelMessageList.lastChild);
    }
    const requestOptions = {
        method: 'GET',
        headers: {'Content-Type': 'application/json',
                   'Authorization': localStorage.getItem('user')},
    }

    new Promise((resolve, reject) => {
        getMessages(true, currentChannel, resolve, reject);
        showPopup(messagesLoading);
        disableBackgroundEnableModalMode();
    }).then(() => {
        for (const messageList of messages) {
            for (const message of messageList) {
                const userIdUrl = "http://localhost:5005/user/" + message.sender.toString();
                promiseArray.push(fetch(userIdUrl, requestOptions))
            }
        }

        let totalMessages = [].concat(...messages);
        let totalMessagesProfilePicutres = [];
        let totalMessagesProfilePicutresPromiseArray = [];
        let j = 0;
        
        for (const messageList of totalMessages) {
            totalMessagesProfilePicutresPromiseArray.push(getUserInfo(totalMessages[j].sender))
            j += 1;
        }

        let allProfilePhotos = [];

        Promise.all(totalMessagesProfilePicutresPromiseArray).then((photos) => {
            for (const photo of photos) {
                allProfilePhotos.push(photo.image);
            }
            let i = 0;
            return new Promise((resolve, reject) => {Promise.all(promiseArray).then((res) => {
                Promise.all(res.map((r) => r.json())).then((datas) => {
                    for (const data of datas) {
                        let newMessageTemplate = document.getElementById(channelScreenInfoName);
                        let newMessage = newMessageTemplate.content.cloneNode(true);
                        newMessage.children[0].id = totalMessages[i].id.toString();

                        const senderName = newMessage.getElementById(messageSenderNameName);
                        senderName.innerText = data.name;
                        senderName.classList.add(totalMessages[i].sender);
                        
                        if (allProfilePhotos[i] !== null) {
                            newMessage.getElementById(messageSenderPhotoName).src = allProfilePhotos[i];
                        } else {
                            newMessage.getElementById(messageSenderPhotoName).src = defaultImage;
                        }

                        if (totalMessages[i].edited) {
                            newMessage.getElementById(messageSenderTimestampName).innerText = "Originally sent: " + new Date(totalMessages[i].sentAt).toLocaleString() + 
                            " (Edited: " + new Date(totalMessages[i].editedAt).toLocaleString() + ")";
                        } else {
                            newMessage.getElementById(messageSenderTimestampName).innerText = new Date(totalMessages[i].sentAt).toLocaleString();
                        }
                        
                        newMessage.getElementById(messageTextName).innerText = totalMessages[i].message;
                        newMessage.getElementById(messageTextName).name = totalMessages[i].id;
                        newMessage.getElementById(deleteMessageButtonName).name = totalMessages[i].id;
                        newMessage.getElementById(editMessageButtonName).name = totalMessages[i].id;
                        newMessage.getElementById(pinnedCheckboxName).name = totalMessages[i].id;

                        const emojiOne = newMessage.getElementById(emojiOneName);
                        const emojiTwo = newMessage.getElementById(emojiTwoName);
                        const emojiThree = newMessage.getElementById(emojiThreeName);
                        const emojiOneCount = newMessage.getElementById(emojiOneCountName);
                        const emojiTwoCount = newMessage.getElementById(emojiTwoCountName);
                        const emojiThreeCount = newMessage.getElementById(emojiThreeCountName);

                        emojiOne.classList.add(totalMessages[i].id.toString());
                        emojiTwo.classList.add(totalMessages[i].id.toString());
                        emojiThree.classList.add(totalMessages[i].id.toString());
                        emojiOneCount.classList.add(totalMessages[i].id.toString());
                        emojiTwoCount.classList.add(totalMessages[i].id.toString());
                        emojiThreeCount.classList.add(totalMessages[i].id.toString());
                        
                        if (totalMessages[i].image != undefined) {

                            const image = document.createElement('img');
                            image.src = totalMessages[i].image;

                            newMessage.getElementById(messageInputSentPhotoName).style.height = "100px"
                            newMessage.getElementById(messageInputSentPhotoName).style.width = "100px" 
                            newMessage.getElementById(messageInputSentPhotoName).src = totalMessages[i].image;
                            allSentImages.push({id: totalMessages[i].id, image: totalMessages[i].image});
                        } 

                        if (totalMessages[i].pinned) {
                            newMessage.getElementById(pinnedCheckboxName).checked = true;
                        }

                        const currentUser = localStorage.getItem('userId');
                        for (const react of totalMessages[i].reacts) {
                            if (react.react == emojiOneName) {
                                if (currentUser == react.user.toString()) {
                                    emojiOne.style.backgroundColor = "blue";
                                }
                                let originalCount = parseInt(emojiOneCount.innerText);
                                emojiOneCount.innerText = (originalCount + 1).toString();
                            } else if (react.react == emojiTwoName) {
                                if (currentUser == react.user.toString()) {
                                    emojiTwo.style.backgroundColor = "blue";
                                }
                                let originalCount = parseInt(emojiTwoCount.innerText);
                                emojiTwoCount.innerText = (originalCount + 1).toString();
                            } else if (react.react == emojiThreeName) {
                                if (currentUser == react.user.toString()) {
                                    emojiThree.style.backgroundColor = "blue";
                                }
                                let originalCount = parseInt(emojiThreeCount.innerText);
                                emojiThreeCount.innerText = (originalCount + 1).toString();
                            }
                        } 
                        newMessage.children[0].style.display = none;
                        channelMessageList.appendChild(newMessage);
                        i += 1;
                    }
                    resolve();   
                }).catch((error) => {
                    showPopup(error);
                })
            }).catch((error) => {
                showPopup(error);
            })
        })}).then(() => {
            const messages = document.getElementsByClassName(messageCardName);
            let i = 0;
            
            let totalPages= Math.floor(messages.length / 25) + 1
            if (messages.length % 25 === 0) {
                totalPages -= 1;
            }

            messagePageNumber.innerText = "1/" + (totalPages).toString();
            currentPageNumber = 1;

            for (const message of messages) {
                if (i < 25) {
                    message.style.display = visible;
                } 

                if (message.children[13].checked) {
                    pinnedMessages.push({onCurrentPage: false, message:message});
                }

                const deleteButton = message.children[5];
                const messageId = parseInt(deleteButton.name);               
                handleDeleteMessage(deleteButton, messageId, message);
                const editButton = message.children[6];
                handleEditMessage(editButton);
                makeMessageResponsive(message);
                handleReacts(message.children[7]);
                handleReacts(message.children[8]);
                handleReacts(message.children[9]);
                handleMessagePinning(message);
                handleUserProfile(message);
                handleImageModal(message)
                window.addEventListener('resize', () => {
                    makeMessageResponsive(message);
                });

                if (i == 24) {
                    lastMessageIdOnScreen = messageId;
                }

                i += 1;
                if (i == messages.length) {
                    message.scrollIntoView();
                }
            }
            handleUpdateEditMessage();
            reenableBackgroundDisableModalMode();
            showPopup(messagesLoaded);
        }).catch((error) => {
            showPopup(error);
        })
    }).catch((error) => {
        showPopup(error);
    })
}

function getMessages(isLoadedAllMessages, currentChannel, resolve, reject) {
    let messageUrl = "http://localhost:5005/message/" + currentChannel + "?start=" + index.toString();
    const requestOptions = {
        method: 'GET',
        headers: {'Content-Type': 'application/json',
                   'Authorization': localStorage.getItem('user')},
    }
    fetch(messageUrl, requestOptions)
    .then((response) => {
        if (response.status !== 200 ) {
            showPopup(notChannelMemberMessage);
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
            reject();
        } else {
            messageInput.style.display = visible;
            messageInputImage.style.display = visible;
            messageInputSubmitButton.style.display = visible;
            messageInputFileButton.style.display = visible;
            removeFileButton.style.display = visible;
            showPinnedMessagesButton.style.display = visible;
            showChannelInfoButton.style.display = visible;
            inviteOthersUsersButton.style.display = visible;
            showNextMessages.style.display = visible;
            showPreviousMessages.style.display = visible;
            messagePageNumber.style.display = visible;

            let desiredMessageInputFieldWidth = (channelScreen.offsetWidth -100).toString();
            desiredMessageInputFieldWidth += 'px';
            messageInput.style.width = desiredMessageInputFieldWidth;
            return response.json();
        }
    })
    .then((data) => {
        messages.push(data.messages.reverse());
        if (data.messages.length != 25) {
            messages.reverse();
            resolve(messages);
        } else {
            index += 25;
            getMessages(isLoadedAllMessages, currentChannel, resolve, reject);
        }
    })
    .catch(() => {
        showPopup(notChannelMemberMessage);
        reenableBackgroundDisableModalMode();
    });
    resizeHomePage();
}
    

