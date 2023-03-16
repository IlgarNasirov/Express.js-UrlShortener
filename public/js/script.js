const url=document.getElementById('urlLink');

const button=document.getElementById('copyButton');

button.addEventListener('click', ()=>{
    url.select();
    url.setSelectionRange(0, 99999);
    navigator.clipboard.writeText(url.value);
    button.innerText="Copied!";
    setTimeout(()=>{
        button.innerText="Copy";
    }, 3000);
});