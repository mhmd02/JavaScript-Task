const img = document.querySelector("img");

      async function fetchImg(){
        const response = await fetch(
          "https://api.giphy.com/v1/gifs/search?api_key=API_KEY_HERE&q=space&limit=1",
        );
        const data = await response.json();
        console.log({data});
        img.src = data.data[0].images.original.url;
      }
      fetchImg();
