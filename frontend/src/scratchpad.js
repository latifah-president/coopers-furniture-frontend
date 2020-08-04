pictureUpload = (picData) => {
    // eslint-disable-next-line
    const date = picData.day;
    let picName;
    let file;
    let refURL;
    let updatedURL = [];
    // eslint-disable-next-line
    const test1 = Object.keys(this.state.selectedPics).map((key) => {
        picName = this.state.selectedPics[key].name;
        file = this.state.selectedPics[key];
        const metadata = {
            contentType: 'image/jpeg'
        };

        let newPicKey = Math.floor(Math.random() * 10000000);
        // eslint-disable-next-line
        let newRef = storageRef.child(picName).put(file, metadata).then((snapshot) =>{
            let progress = snapshot.bytesTransferred / snapshot.totalBytes*100
                console.log('Upload is ' + progress + '% done');
            snapshot.ref.getDownloadURL().then((downloadURL) => {
                let testURL = {
                    [newPicKey]: downloadURL
                };
                refURL = {
                    ...refURL,
                    [key]: testURL,
                    key: key
                };
                updatedURL.push(testURL);
                let picId;

                mainRef.child('images').on('value', (snap) => (picId = snap.val()));
                console.log(mainRef.bytesTransferred);

                const newUserId = Object.keys(picId).filter((key) => key === userId);
                let newObj;

                Object.keys(this.state.selectedPics).map((key) => {
                    const refKey = Object.keys(updatedURL[key] || {}).map((key) => {
                        return key;
                    });

                    let date = refKey[0];
                    if (refKey.length !== 0) {
                        newObj = {
                            ...newObj,
                            [refKey]: {
                                date: date,
                                url: updatedURL[key][refKey]
                            }
                        };
                        // eslint-disable-next-line
                    } else {
                        // eslint-disable-next-line
                        return;
                    }
                    return newObj;
                });

                if (newUserId.length === 0) {
                    const pictures = {
                        [date]: newObj
                    };

                    const newPicUpload = {
                        ...this.state.production.images,
                        [userId]: pictures
                    };
                    console.log(newPicUpload);

                    this.setState((prevState) => ({
                        production: {
                            ...prevState.production,
                            images: newPicUpload
                        }
                    }));

                    mainRef.child('images').set(newPicUpload);
                    
                } else {
                    const newPicUpload = {
                        ...this.state.production.images[userId],
                        [date]: newObj
                    };
                    console.log(newPicUpload);
                    const newUserImageObj = {
                        ...this.state.production.images,
                        [userId]: newPicUpload
                    };
                    console.log(newUserImageObj);

                    this.setState((prevState) => ({
                        production: {
                            ...prevState.production,
                            images: newUserImageObj
                        }
                    }));
                    mainRef.child('images').set(newUserImageObj);
                }
            })
        });
        
    });
    setTimeout(()=>alert("Images uploaded!"),3000)
};
