import { fileToDataUrl } from "./helpers.js";
import { getUserInfo, loadMessages } from "./messages.js";
import { isValidEmail, showPopup } from "./register_and_login.js";

let currentName;
let currentEmail;
let currentBio;
let currentPassword;
let currentImage;

const inviteUsersButtonName = "invite-users";
const obtainAllUsersError = "Couldn't get all users"
const homePageName = "home-page";
const slackrTitleName = "slackr-title";
const inviteUsersFormName = "invite-users-info";
const inviteUsersListName = "invite-users-list";
const visible = "block";
const none = "none";
const closeInviteUsersInfoName = "close-invite-users-info";
const gettingUserInfoError = "Cannot get user info";
const cannotInviteUser = "Cannot invite"
const cannotUpdateProfile = "Cannot update profile";
const cannotObtainChannelMembers = "Cannot get channel members"
const editSuccessful = "Profile updated successfully!"
const editProfileInfoButtonName = "show-profile-info";
const userProfileInfoName = "user-profile-info";
const editProfileNameInputName = "edit-profile-name";
const editProfilePasswordInputName = "edit-profile-password";
const editProfileBioInputName = "edit-profile-bio";
const editProfileEmailInputName = "edit-profile-email";
const editProfilePhotoInputButtonName = "edit-profile-photo-button";
const invalidEmail = "Invalid email";
const userProfileNameName = "user-profile-name";
const userProfilePasswordName = "user-profile-password";
const userProfileEmailName = "user-profile-email";
const userProfileBioName = "user-profile-bio";
const userProfilePhotoName = "user-profile-photo";
const submitEditMessageFormName = "submit-new-profile-info";
const messageCardName = "message-card";
const successfulInvite = "Invited!";
const defaultImage = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAM1BMVEXk5ueutLeqsbTn6eqpr7PJzc/j5ebf4eLZ3N2wtrnBxsjN0NLGysy6v8HT1tissra8wMNxTKO9AAAFDklEQVR4nO2d3XqDIAxAlfivoO//tEOZWzvbVTEpic252W3PF0gAIcsyRVEURVEURVEURVEURVEURVEURVEURVEURVEURflgAFL/AirAqzXO9R7XNBVcy9TbuMHmxjN6lr92cNVVLKEurVfK/zCORVvW8iUBnC02dj+Wpu0z0Y6QlaN5phcwZqjkOkK5HZyPAjkIjSO4fIdfcOwFKkJlX4zPu7Ha1tIcwR3wWxyFhRG6g4Je0YpSPDJCV8a2Sv2zd1O1x/2WMDZCwljH+clRrHfWCLGK8REMiql//2si5+DKWKcWeAGcFMzzNrXC/0TUwQ2s6+LhlcwjTMlYsUIQzPOCb7YBiyHopyLXIEKPEkI/TgeuiidK/R9FniUDOjRDpvm0RhqjMyyXNjDhCfIMYl1gGjIMIuYsnGEYRMRZOMMunaLVwpWRW008v6fYKDIzxCwVAeNSO90BJW6emelYBRF/kHpYGVaoxTDAaxOFsfP9y8hpJ4xd7gOcij7JNGQ1EYFgkPJa1jQEiYZXRaRINKxSDUW9n+FT82lSKadkiru9/4XPqSLWOekGPoY05TAvLm9orm+YWuwHoBHkZKijNBJGmeb61eL6Ff/6q7bLr7yvv3vKGhpDRjvgjGaPz+gUg6YgcvpyAR2FIZ9U6nEEyZRTovmEU32KichpGn7C17XrfyH9gK/c0CMP05HZIM2uf9sEveizKveBy9/6Qt7o89ne33D525cfcIMW6ab+TMEukQbQbu+xu7X3A9bChmWaCeAkG17bpntwXgWxHaMzGPmUaR5dQZiKqRVeUZ3047fi3nAu28h4CHxCsZAgmEH8Y27jJAhm8c+5RQzRQNVGhVFSfxOYIjp/pP7RxzjevYXVGf4eLt+BJ1vCuLuLkrgABgCGXZ2wik5uty+oBvNirI6mkzhAf4Gsb58Hcm67Jzd+KwD10BYPLL3e0MjvKrgAULnOfveF/O4N2Xb9BZom3gJes3F9X5Zze8/6Yt09b4CrqsEjUv8oFBaR2rl+6CZr2xVrp24o/WitBKuGrrpl1+bFkmK2qXTON4VpbdfLa7o7y/WdLxG7lm2Lqh2clOwTegbvc/vj2U78CwhA87Bn8G5Nk3eOb0Nsr9flz3sG78UUtue4kpv1xvjg3TMay62BMlTlP+vrOMnJsRmt/ze0jsfkPPYdAH57hK+34PeOyc8XIXu5xT2HsUkdZz+adwg8HGFfQ3K5jtDvbUiO4Di9/ywHGrL88pDizZ++oTp+an+SMX/ndymUCwmHMdO7yuOx83pUx/eEMU0AvxWndwgidAqOZ8ypCwdEfvvEo6D9HwpA8wzvmOJEqAg9ySu8g4x0Hb9hSB/BANEKJ+LbPBU0lzbAJs4xt1AoshKkUGQmiH8/jJ0gdhTTLmSegHlPE0oOdXALnqDjKYh3px//fSgSWG8UqfrrIICzYYSJXRr9BSPbpNzw7gBjKjKOYI7ReIGqQRIap5+5MdjyvuDkExvGeXSlONWZAP3/AZBwJohU7QJRGU+cTVH18ELmRPNBmibW6MT/k1b0XhdkRBvyT6SB6EYv/GvhSmRNpGngRULsAlxMCGNXp7w3FfdEbTEEDdLI9TdIKRUzUesa3I461ER8cpNT7gMRhpKmYVS9ELOgCUQsa4SsulciKiLbY+AnHD8cpuhISsnxpamI84sbDq9qYJgf8wiiOBrC7Ml7M7ZECCqKoiiKoiiKoiiKoijv5AvJxlZRyNWWLwAAAABJRU5ErkJggg==";

const inviteOthersUsersButton = document.getElementById(inviteUsersButtonName);
const inviteUsersInfo = document.getElementById(inviteUsersFormName);
const closeInviteUsersInfoButton = document.getElementById(closeInviteUsersInfoName);
const inviteUsersList = document.getElementById(inviteUsersListName);
const editProfileButton = document.getElementById(editProfileInfoButtonName);
const userProfileInfo = document.getElementById(userProfileInfoName);
const editProfileNameInput = document.getElementById(editProfileNameInputName);
const editProfilePasswordInput = document.getElementById(editProfilePasswordInputName);
const editProfileBioInput = document.getElementById(editProfileBioInputName);
const editProfileEmailInput = document.getElementById(editProfileEmailInputName);
const editProfilePhotoInputButton = document.getElementById(editProfilePhotoInputButtonName);
const userProfilePhoto = document.getElementById(userProfilePhotoName);
const userProfileName = document.getElementById(userProfileNameName);
const userProfilePassword = document.getElementById(userProfilePasswordName);
const userProfileEmail = document.getElementById(userProfileEmailName);
const userProfileBio = document.getElementById(userProfileBioName);
const submitEditMessageForm = document.getElementById(submitEditMessageFormName);

export function disableBackgroundEnableModalMode() {
    const slackrTitle = document.getElementById(slackrTitleName);
    const body = document.getElementsByTagName("BODY")[0];
    const homeScreen = document.getElementById(homePageName);
    homeScreen.style.zIndex = -1;
    body.style.backgroundColor = 'rgb(' + [0,0,0,0.4].join(',') + ')';
    slackrTitle.style.backgroundColor = 'rgb(' + [0,0,0,0.4].join(',') + ')';
}

export function reenableBackgroundDisableModalMode() {
    const slackrTitle = document.getElementById(slackrTitleName);
    const body = document.getElementsByTagName("BODY")[0];
    const homeScreen = document.getElementById(homePageName);
    homeScreen.style.zIndex = 0;
    body.style.backgroundColor = "transparent";
    slackrTitle.style.backgroundColor = "transparent";
}

function getAllUsers() {
    const getUsersUrl = "http://localhost:5005/user";
    const requestOptions = {
        method: 'GET',
        headers: {'Content-Type': 'application/json',
                   'Authorization': localStorage.getItem('user')},
    }
    return fetch(getUsersUrl, requestOptions).then((res) => {
        if (res.status !== 200) {
            showPopup(obtainAllUsersError);
        } else {
            return res.json().then((data) => {
                return data;
            })
        }
    }).catch((error) => {
        showPopup(error);
    })
}

function getAllChannelMembers() {
    const getChannelMembersUrl = "http://localhost:5005/channel/" + localStorage.getItem('channelId')
    const requestOptions = {
        method: 'GET',
        headers: {'Content-Type': 'application/json',
                   'Authorization': localStorage.getItem('user')},
    }
    return fetch(getChannelMembersUrl, requestOptions).then((res) => {
        if (res.status !== 200) {
            showPopup(cannotObtainChannelMembers);
        } else {
            return res.json().then((data) => {
                return data.members;
            })
        }
    }).catch((error) => {
        showPopup(error);
    })
}

function handleInviteUser(user) {
    const inviteUserUrl = "http://localhost:5005/channel/" + localStorage.getItem('channelId') + "/invite";
    const jsonString = JSON.stringify({
        userId: parseInt(user.id),
    });
    const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json',
                   'Authorization': localStorage.getItem('user')},
        body: jsonString,
    }

    user.addEventListener('click', () => {
        fetch(inviteUserUrl, requestOptions).then((res) => {
            if (res.status !== 200) {
                showPopup(cannotInviteUser);
            } else {
                res.json().then((data) => {
                    inviteUsersList.removeChild(user);
                    showPopup(successfulInvite);
                })
            }
        }).catch((error) => {
            showPopup(error);
        })
    });
}

closeInviteUsersInfoButton.addEventListener('click', () => {
    inviteUsersInfo.style.display = none;
    reenableBackgroundDisableModalMode();
})

inviteOthersUsersButton.addEventListener('click', () => {
    inviteUsersInfo.style.display = visible;
    disableBackgroundEnableModalMode()


    new Promise((resolve, reject) => {
        getAllUsers().then((users) => {
            resolve(users);
        });
    }).then((usersDetails) => {
        let allUsers = [];
        let notChannelMembersPromises = [];

        new Promise((resolve, reject) => {
            getAllChannelMembers().then((channelMembers) => {
                resolve(channelMembers);
            })
        }).then((channelMembers) => {
            let notChannelMembers = [];
            for (const user of usersDetails.users) {
                if (!Object.values(channelMembers).includes(user.id)) {
                    notChannelMembers.push(user);
                }
            }

            for (const user of notChannelMembers) {
                notChannelMembersPromises.push(getUserInfo(user.id));
            }

            Promise.all(notChannelMembersPromises).then((users) => {
                users.sort();
                let i = 0;
                for (const userInfo of users) {
                    let id = 0;
                    for (const user of usersDetails.users) {
                        if (user.email === userInfo.email) {
                            id = user.id;
                        }
                    }
                    allUsers.push({name: userInfo.name, id: id});
                    i += 1;
                }
                allUsers.sort((a,b) => (a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1));
    
                const currentUserId = localStorage.getItem('userId');
    
                while (inviteUsersList.firstChild) {
                    inviteUsersList.removeChild(inviteUsersList.lastChild);
                }
    
                new Promise((resolve, reject) => {
                    getUserInfo(currentUserId).then((userInfo) => {
                        for (const user of allUsers) {
                            if (user.name !== userInfo.name) {
                                const userToInvite = document.createElement("div");
                                userToInvite.id = user.id.toString();
                                userToInvite.innerText = user.name;
                                userToInvite.style.border = "1px solid black";
                                userToInvite.style.marginBottom = "10px";
                                userToInvite.style.overflowWrap = "break-word";
                                inviteUsersList.appendChild(userToInvite);
                            }
                        }
                        resolve();
                    }).catch((error) => {
                        showPopup(error);
                    })
                }).then(() => {
                    for (const user of inviteUsersList.children) {
                        handleInviteUser(user);
                    }
                }).catch((error) => {
                    showPopup(error);
                })
            }).catch((error) => {
                showPopup(error);
            })
        }).catch((error) => {
            showPopup(error);
        })
    }).catch((error) => {
        showPopup(error);
    })
});

function editProfile(getUserProfileUrl, requestOptions, newEmail, newPassword, newName, newBio, newImage) {
    fetch(getUserProfileUrl, requestOptions).then((res) => {
        if (res.status !== 200) {
            showPopup(cannotUpdateProfile);
        } else {
            res.json().then((data) => {
                userProfileInfo.children[1].children[0].src = newImage;
                userProfileInfo.children[2].innerText = "Name: " + newName;
                userProfileInfo.children[3].children[1].value = newPassword;
                userProfileInfo.children[5].innerText = "Email: " + newEmail;
                if (newBio != null) {
                    userProfileInfo.children[6].innerText = "Bio: " + newBio;
                } else {
                    userProfileInfo.children[6].innerText = "Bio: None available";
                }

                loadMessages(localStorage.getItem('channelId'));
                showPopup(editSuccessful);
            })
        }
    }).catch((error) => {
        showPopup(error);
    })
}

function handleUpdateProfile() {
    disableBackgroundEnableModalMode();
    userProfileInfo.style.display = visible;

    const getUserProfileUrl = "http://localhost:5005/user";
    const currentUserId = localStorage.getItem('userId').toString();
    new Promise((resolve, reject) => {
        getUserInfo(currentUserId).then((userInfo) => {
            resolve(userInfo)
        }).catch((error) => {
            showPopup(error);
        })
    }).then((userInfo) => {
        let newEmail = userInfo.email;
        currentEmail = newEmail;
        let newBio = userInfo.bio;
        currentBio = newBio;
        let newImage = userInfo.image;
        currentImage = newImage;
        let newName = userInfo.name;
        currentName = newName;
        let newPassword = localStorage.getItem("password");
        currentPassword = newPassword;

        userProfilePhoto.style.display = visible;
        let i = 0;
        while (i <= 14) {
            userProfileInfo.children[i].style.display = visible;
            i += 1;
        }

        userProfileInfo.children[0].children[0].innerText = "View/Edit Profile";
        if (newImage != null) {
            userProfilePhoto.src = newImage;
        } else {
            userProfilePhoto.src = defaultImage;
        }

        userProfileName.style.display = visible;
        userProfileName.innerText = "Name: " + newName;
        userProfileName.style.overflowWrap = "break-word";
        userProfileInfo.children[3].children[1].value = newPassword;
        userProfileInfo.children[3].children[1].type = "password";

        userProfileInfo.children[4].children[1].addEventListener('click', () => {
            if (userProfileInfo.children[4].children[1].checked) {
                userProfileInfo.children[3].children[1].type = "text";
                userProfileInfo.children[3].children[1].value = newPassword;
            } else {
                userProfileInfo.children[3].children[1].type = "password";
                userProfileInfo.children[3].children[1].value = newPassword;
            }
        });

        userProfileInfo.children[5].innerText = "Email: " + newEmail;
        
        if (userInfo.bio != null) {
            userProfileInfo.children[6].innerText = "Bio: " + userInfo.bio;
        } else {
            userProfileInfo.children[6].innerText = "Bio: None available";
        }

        i = 8;
        while (i <= 13) {
            userProfileInfo.children[i].children[0].style.display = visible;
            userProfileInfo.children[i].children[0].style.marginLeft = "auto";
            userProfileInfo.children[i].children[0].style.marginRight = "auto";
            i += 1;
        }

        submitEditMessageForm.removeEventListener('click', submitNewProfileInfo);
        submitEditMessageForm.addEventListener('click', submitNewProfileInfo);
    }).catch((error) => {
        showPopup(error);
    })
}

editProfileButton.addEventListener('click', () => {
    handleUpdateProfile();
});

function submitNewProfileInfo() {

    const getUserProfileUrl = "http://localhost:5005/user";
    let newName = currentName;
    let newBio = currentBio;
    let newEmail = currentEmail;
    let newPassword = currentPassword;
    let newImage = currentImage;
    
    if (editProfileNameInput.value !== "") {
        newName = editProfileNameInput.value;
    }

    if (editProfileEmailInput.value !== "" && editProfileEmailInput.value !== newEmail) {
        newEmail = editProfileEmailInput.value;
    } else {
        newEmail = "";
    }

    if (editProfileBioInput.value !== "") {
        newBio = editProfileBioInput.value;
    }

    if (editProfilePasswordInput.value !== "") {
        newPassword = editProfilePasswordInput.value;
    }

    if (editProfileEmailInput.value !== "") {
        newPassword = editProfileEmailInput.value;
    }

    let jsonString = JSON.stringify({
        email: newEmail,
        password: newPassword,
        name: newName,
        bio: newBio,
        image: newImage,
    });

    const requestOptions = {
        method: 'PUT',
        headers: {'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem('user')},
        body: jsonString,
    }

    if (editProfilePhotoInputButton.files.length > 0) {
        fileToDataUrl(editProfilePhotoInputButton.files[0]).then((imageUri) => {
            jsonString = JSON.stringify({
                email: newEmail,
                password: newPassword,
                name: newName,
                bio: newBio,
                image: imageUri,
            });

            const requestOptions = {
                method: 'PUT',
                headers: {'Content-Type': 'application/json',
                            'Authorization': localStorage.getItem('user')},
                body: jsonString,
            }

            if (newEmail === "") {
                newEmail = currentEmail; 
            }

            newImage = imageUri;
            editProfile(getUserProfileUrl, requestOptions, newEmail, newPassword, newName, newBio, imageUri);
        }).catch((error) => {
            showPopup(error);
        })
    } else {
        if (newEmail === "") {
            newEmail = currentEmail; 
        }

        editProfile(getUserProfileUrl, requestOptions, newEmail, newPassword, newName, newBio, newImage);
    }   
}

