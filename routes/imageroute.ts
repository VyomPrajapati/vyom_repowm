interface ImageRoute {
    [key: string]: string;
}

interface FolderImageRoutes {
    [folderName: string]: ImageRoute;
}

export const imageRoutes: FolderImageRoutes = {
    core: {
        logo: 'https://firebasestorage.googleapis.com/v0/b/wild-mind-ai.firebasestorage.app/o/public%2Fcore%2Flogomain.png?alt=media&token=28bd622f-58ff-4612-8012-799d7bdfce52',  
        coins : 'https://firebasestorage.googleapis.com/v0/b/wild-mind-ai.firebasestorage.app/o/public%2Fsetting%2Fcoins.png?alt=media&token=56e61d6d-8695-47ea-8e4d-952d2f8ff1ed',
        diamond : 'https://firebasestorage.googleapis.com/v0/b/wild-mind-ai.firebasestorage.app/o/public%2Fsetting%2Fdiamond.png?alt=media&token=4aad71ad-e181-4d8c-b2da-2de227d44336',
        profile:'https://firebasestorage.googleapis.com/v0/b/wild-mind-ai.firebasestorage.app/o/public%2Fsetting%2Fprofile.png?alt=media&token=fb2b2e2c-944a-458e-a505-8ca414315d00'
    },
    landingpage:{
        discordimage: 'https://firebasestorage.googleapis.com/v0/b/wild-mind-ai.firebasestorage.app/o/public%2Flandingpage%2Fdiscordview%2Fdc_view.gif?alt=media&token=8de2b2b8-3624-4c11-851a-d9e0e3cb76f4',
        discorddark : 'https://firebasestorage.googleapis.com/v0/b/wild-mind-ai.firebasestorage.app/o/public%2Flandingpage%2Fdiscordview%2Fdiscorddark.svg?alt=media&token=213ad347-59a1-41af-84a4-2ee6f3bacba8',
        discord : 'https://firebasestorage.googleapis.com/v0/b/wild-mind-ai.firebasestorage.app/o/public%2Flandingpage%2Fdiscordview%2Fdiscord.svg?alt=media&token=0b154550-809a-409f-83ee-5c89b827c716',
        usingai:'https://firebasestorage.googleapis.com/v0/b/wild-mind-ai.firebasestorage.app/o/public%2Flandingpage%2Faiview%2Faiview.png?alt=media&token=85921e13-e1d1-4587-a14c-688c7c8becc5',
        horizonalimage:"https://firebasestorage.googleapis.com/v0/b/wild-mind-ai.firebasestorage.app/o/public%2Flandingpage%2Fhorizontal%20scroll%2Frollingimages.png?alt=media&token=5075caa4-ffe7-4c1e-b17d-c50389b0c349",
        saying1:'https://firebasestorage.googleapis.com/v0/b/wild-mind-ai.firebasestorage.app/o/public%2Flandingpage%2Fsayings%2Fsvg1.svg?alt=media&token=813178f5-1f08-40ae-9b07-600ffc09d9df',
        saying2:'https://firebasestorage.googleapis.com/v0/b/wild-mind-ai.firebasestorage.app/o/public%2Flandingpage%2Fsayings%2Fsvg2.svg?alt=media&token=f7637342-a38c-4374-9ca8-7d1d40323321',
        saying3:'https://firebasestorage.googleapis.com/v0/b/wild-mind-ai.firebasestorage.app/o/public%2Flandingpage%2Fsayings%2Fsophia.png?alt=media&token=580c3be8-de8f-4cab-b1b5-d4d734e2fbfe',
        realtimegen:'https://firebasestorage.googleapis.com/v0/b/wild-mind-ai.firebasestorage.app/o/public%2Flandingpage%2Fcommingsoon%2Frealtime-canvas.gif?alt=media&token=96f5c800-b103-4b5b-abe1-5b828a31aac4',
        sketchtoimage:'https://firebasestorage.googleapis.com/v0/b/wild-mind-ai.firebasestorage.app/o/public%2Flandingpage%2Fcommingsoon%2FSketchtoimage.png?alt=media&token=990cf810-7e60-4939-bbaf-6cdfaa7e01c1',
        texttovideo:'https://firebasestorage.googleapis.com/v0/b/wild-mind-ai.firebasestorage.app/o/public%2Flandingpage%2Fcommingsoon%2Frealtime-canvas.gif?alt=media&token=96f5c800-b103-4b5b-abe1-5b828a31aac4',
        texttod:'https://firebasestorage.googleapis.com/v0/b/wild-mind-ai.firebasestorage.app/o/public%2Flandingpage%2Fcommingsoon%2Frealtime-canvas.gif?alt=media&token=96f5c800-b103-4b5b-abe1-5b828a31aac4',
    },
    contactus:{
        bg_rating:'https://firebasestorage.googleapis.com/v0/b/wild-mind-ai.firebasestorage.app/o/public%2Fcontactus%2Fbg_rating7.png?alt=media&token=dd5616e9-274a-4039-af4e-f69378d2d1f1',
        rateicon : 'https://firebasestorage.googleapis.com/v0/b/wild-mind-ai.firebasestorage.app/o/public%2Fcontactus%2Frateicon.png?alt=media&token=b6e24a27-e2c5-4768-a8bb-87ce6954b242'
    },
    
    sign:{
        signup: 'https://firebasestorage.googleapis.com/v0/b/wild-mind-ai.firebasestorage.app/o/public%2Fsignin%2Fstableturbo-1742556691988.png?alt=media&token=603728fa-ea51-4965-82ea-b7e3bbc16dc8',
        
    },
    artstation:{
        burger:'https://firebasestorage.googleapis.com/v0/b/wild-mind-ai.firebasestorage.app/o/public%2Fartstation%2FCard.png?alt=media&token=382040fa-3157-492f-8df7-4dbec4135f7e',
        dogs:'https://firebasestorage.googleapis.com/v0/b/wild-mind-ai.firebasestorage.app/o/public%2Fartstation%2FCard1.png?alt=media&token=864f8a42-b191-4d29-ba64-2f7e7dc619a8',
        dogs2:'https://firebasestorage.googleapis.com/v0/b/wild-mind-ai.firebasestorage.app/o/public%2Fartstation%2FCard2.png?alt=media&token=7d55bfa9-e8cf-403c-a1fe-844a22ff873f',
        remix:'https://firebasestorage.googleapis.com/v0/b/wild-mind-ai.firebasestorage.app/o/public%2Fartstation%2Fremix.png?alt=media&token=0012f641-49e1-4187-9a5f-de499465e1ee',
        remix2:'https://firebasestorage.googleapis.com/v0/b/wild-mind-ai.firebasestorage.app/o/public%2Fartstation%2Fremix1.png?alt=media&token=08a34931-9e9b-40d8-baf0-7d2c0ce22b90'
    },
    home:{
        fluxshanell:'https://firebasestorage.googleapis.com/v0/b/wild-mind-ai.firebasestorage.app/o/public%2Fhome%2Fshanell.png?alt=media&token=575796b0-209b-4975-b3b8-55f0a9673ee4',
        fluxdev:'https://firebasestorage.googleapis.com/v0/b/wild-mind-ai.firebasestorage.app/o/public%2Fhome%2Fdev.png?alt=media&token=ef4c49d1-9ee0-43f6-81b1-19a64b84d211',
        imagin:'https://firebasestorage.googleapis.com/v0/b/wild-mind-ai.firebasestorage.app/o/public%2Fhome%2Fimagin.png?alt=media&token=477b2629-3cc7-4a3b-8a61-379f3032a970',
        large:'https://firebasestorage.googleapis.com/v0/b/wild-mind-ai.firebasestorage.app/o/public%2Fhome%2Flarge.png?alt=media&token=4fcf1814-35b6-40bd-9c18-16a5657bdfaf',
        medium:'https://firebasestorage.googleapis.com/v0/b/wild-mind-ai.firebasestorage.app/o/public%2Fhome%2Fmedium.png?alt=media&token=0974c5d4-a7b1-44d0-88ee-3439c28f59ef',
        xl:'https://firebasestorage.googleapis.com/v0/b/wild-mind-ai.firebasestorage.app/o/public%2Fhome%2Fxl.png?alt=media&token=4c14f209-cdfe-4ab5-91f1-9a12c9131685',
    },
    blog:{

    },
    imagegenerate:{

    },
    svgs:{
        google:'https://firebasestorage.googleapis.com/v0/b/wild-mind-ai.firebasestorage.app/o/public%2Fcore%2Fgoogle.svg?alt=media&token=5fb13362-b31d-4791-89d2-1a596d07ed17',
        apple:'https://firebasestorage.googleapis.com/v0/b/wild-mind-ai.firebasestorage.app/o/public%2Fcore%2Fapple.svg?alt=media&token=c7fb97bb-0278-4b5d-9e86-a68977d0cb7d',
        microsoft:'https://firebasestorage.googleapis.com/v0/b/wild-mind-ai.firebasestorage.app/o/public%2Fcore%2Fmicrosoft.svg?alt=media&token=88336993-efca-4fc2-89d4-338ba028a6f5',
    },
    plans:{

    },
    supportus:{

    },
    templates:{

    },
    
};











// Helper function to get image URL by folder and name
export const getImageUrl = (folder: string, imageName: string): string => {
    const folderImages = imageRoutes[folder];
    if (!folderImages) {
        console.warn(`Folder not found: ${folder}`);
        return '';
    }
    
    const url = folderImages[imageName];
    if (!url) {
        console.warn(`Image route not found for name: ${imageName} in folder: ${folder}`);
        return '';
    }
    return url;
};
