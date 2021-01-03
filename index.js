const puppeteer = require('puppeteer');
 
const start = async () => {
    const browser = await puppeteer.launch( { headless: true } );
    const page = await browser.newPage();
    await page.goto('https://github.com/backend-br/vagas/issues');

    const datas = await page.evaluate( () => {
        const datas = new Array();

        const container = document.querySelectorAll(".flex-auto.min-width-0.p-2.pr-3.pr-md-2");
        
        for(let i = 0; i < container.length; i++){
            const containerInfo = container[i].innerText;
            
            datas[i] = {
                name: containerInfo,
                requirements: ["Requisitos: "]
            }

            let labels = document.querySelectorAll(".labels.lh-default.d-block.d-md-inline")[i].querySelectorAll(".IssueLabel.hx_IssueLabel");
            
            if(labels.length <= i) break;
            
            for(let j = 0; j < labels.length; j++){
                console.log(labels.length);
    
                labels = labels[j].innerText;
                
    
                datas[i].requirements.push(labels)
            }
        }
        return datas;
    });


    console.log(datas);

    await browser.close();
};

start();