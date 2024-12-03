class AppletGallery {
    
    constructor(dataUrl) {
        this.dataUrl = dataUrl;
        this.appletgallery = [];
        this.init();
    }

    async init() {
        await this.fetchData();
        this.renderAppletGallery(this.appletgallery); 
        this.bindSearchEvent();
    }

    async fetchData() {
        try {
            const response = await fetch(this.dataUrl);
            this.appletgallery = await response.json();
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    renderAppletGallery(appletgallery) {
        const appletgalleryCont = document.getElementById('appletgalleryCont');
        appletgalleryCont.innerHTML = `<div style="display: flex; flex-wrap: wrap; justify-content: center;">` + appletgallery.map(applet => 
            `<div class="card" style="width: 20rem; border: 2px solid #000000; border-radius: 5px; margin: 10px;"> 
                <img src="${applet.Image}" class="card-img-top image" alt="${applet.Applet_No}" style="border-top-left-radius: 5px; border-top-right-radius: 5px; height: 200px; object-fit: cover;">
                <div class="card-body">
                    <h5 class="card-title">${applet.Applet_No}</h5>
                    <p class="card-text">${applet.Description}</p>
                    <a href="${applet.Link}" class="btn btn-primary text-center" style="display: block; width: 100%;">Click if Interested</a>
                </div>
            </div>`
        ).join('');
    }

    bindSearchEvent() {
        const appletSearchBar = document.getElementById('appletSearchBar'); 

        appletSearchBar.addEventListener('input', () => {
            this.filterApplet(appletSearchBar.value);
        });

    }

    filterApplet(query) {
        const filteredapplet = this.appletgallery.filter(applet => {
            return applet.Applet_No.toLowerCase().includes(query.toLowerCase())
        });

        this.renderAppletGallery(filteredapplet);
    }   
}

const appletgallery = new AppletGallery('RecreationActivities.json');
