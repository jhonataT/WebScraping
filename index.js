const puppeteer = require('puppeteer');
const fs = require('fs');
 
const start = async () => {
    const browser = await puppeteer.launch( { headless: true } );
    const page = await browser.newPage();
    await page.goto('https://github.com/backend-br/vagas/issues?q=is%3Aopen+is%3Aissue+label%3APHP');

    const datas = await page.evaluate( () => { // Init web-page script
        let datas = new Array();
        
        const container = document.querySelectorAll(".flex-auto.min-width-0.p-2.pr-3.pr-md-2");
        
        for(let i = 0; i < container.length; i++){
            let requirements = new Array();
            const containerInfo = container[i].innerText;
            
            
            let labels = document.querySelectorAll(".labels.lh-default.d-block.d-md-inline")[i].querySelectorAll(".IssueLabel.hx_IssueLabel");
            
            if(i >= labels.length) break;
            
            for(let j = 0; j < labels.length; j++){
                console.log(labels.length);
                requirements.push(labels[j].innerText);
            }

            datas[i] = {
                name: containerInfo,
                requirements: requirements
            }
        }
        return datas;
    });

    await browser.close();
    await  writeFile(JSON.stringify(datas)); 
};

const writeFile = async data => {
    await fs.writeFile('./datas.json', data, err => {
        if(err) throw err;
        console.log('Sucess!');
    });
}

start();