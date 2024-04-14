async function getRectangleImage(width, height) {
    try {
        const infoContent = document.getElementById('infoContent');
        infoContent.textContent = ''
        const response = await fetch(`https://picsum.photos/${width}/${height}`);
        if (!response.ok) {
            throw new Error('Failed to fetch image');
        }
        const blob = await response.blob();
        const id = response.url.split('/').slice(-3)[0];
        const imageUrl = URL.createObjectURL(blob);

        const infoButton = document.getElementById('fetchInfo');

        // error here, wont stringify json
        infoButton.addEventListener('click', async () => {
            const infoContent = document.getElementById('infoContent');
            try {
                const info = await getInfo(id);
                infoContent.textContent = `Image id: ${JSON.stringify(info.id)}\n

                Image author:  ${JSON.stringify(info.author)}\n

                Download image: ${JSON.stringify(info.download_url)}`;
            } catch (error) {
                console.error('Error fetching info:', error);
                infoContent.textContent = 'Error fetching information';
            }
        })

        return imageUrl;
    } catch (error) {
        console.error('Error fetching image:', error);
        return null;
    }
}

async function getSquareImage(dimensions) {
    try {
        const infoContent = document.getElementById('infoContent');
        infoContent.textContent = ''
        const response = await fetch(`https://picsum.photos/${dimensions}`) 
        if (!response.ok) {
            throw new Error('Failed to fetch image');
        }
        const blob = await response.blob();
        const id = response.url.split('/').slice(-3)[0];
        const infoButton = document.getElementById('fetchInfo');


        const imageUrl = URL.createObjectURL(blob);
        infoButton.addEventListener('click', async () => {
            const infoContent = document.getElementById('infoContent');
            try {
                const info = await getInfo(id);
                console.log(info.download_url);
                infoContent.textContent = `Image id: ${JSON.stringify(info.id)}\n

                Image author:  ${JSON.stringify(info.author)}\n
                
                Download image: ${JSON.stringify(info.download_url)}`;
            } catch (error) {
                console.error('Error fetching info:', error);
                infoContent.textContent = 'Error fetching information';
            }
        })

        return imageUrl;
    } catch (error) {
        console.error('Error fetching image:', error);
        return null;
    }
}

async function getInfo(id) {
    try {
        const response = await fetch(`https://picsum.photos/id/${id}/info`);
        if (!response.ok) {
            throw new Error('Failed to fetch image information');
        }

        const text = await response.json()
        return text;
    } catch (error) {
        console.error('Error fetching image information:', error);
        return null;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const widthInput = document.getElementById('widthInput');
    const heightInput = document.getElementById('heightInput');
    const fetchButton = document.getElementById('fetchButton');
    const imageElement = document.getElementById('imageElement');
    const infoContent = document.getElementById('infoContent');

    fetchButton.addEventListener('click', async () => {
        infoContent.textContent = '';
        const width = parseInt(widthInput.value);
        const height = parseInt(heightInput.value);
        
        if (width <= 0 || height < 0 || width > 5000 || height > 5000) {
            alert('Not a valid height or width');
        } else if (height == 0) {
            try {
                const imageUrl = await getSquareImage(width);
                if (imageUrl) {
                    imageElement.src = imageUrl;
                } else {
                    throw new Error('Failed to fetch image URL');
                }
            } catch (error) {
                console.error('Error displaying image:', error);
                imageElement.textContent = 'Image not available';
            }
        } 
        else {
            try {
                const imageUrl = await getRectangleImage(width, height);
                if (imageUrl) {
                    imageElement.src = imageUrl;
                } else {
                    throw new Error('Failed to fetch image URL');
                }
            } catch (error) {
                console.error('Error displaying image:', error);
                imageElement.textContent = 'Image not available';
            }
        }
    });
});
