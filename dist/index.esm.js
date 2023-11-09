import"colors";import e,{existsSync as t,mkdirSync as o,appendFile as r,readFileSync as i,writeFileSync as n,readFile as s,promises as a}from"fs";import l,{join as c,posix as p}from"path";import d from"body-parser";import u from"cors";import h from"express";import g from"multer";import m from"http";import f from"https";import v from"dotenv";import y from"express-rate-limit";import*as b from"url";import{fileURLToPath as w}from"url";import T from"https-proxy-agent";import{v4 as x}from"uuid";import{Pool as k}from"tarn";import S from"puppeteer";import H from"node:path";import{randomBytes as E}from"node:crypto";import"prompts";v.config();const R={puppeteer:{args:{value:[],type:"string[]",description:"Array of arguments to send to puppeteer."}},highcharts:{version:{value:"latest",envLink:"HIGHCHARTS_VERSION",type:"string",description:"Highcharts version to use."},cdnURL:{value:"https://code.highcharts.com/",envLink:"HIGHCHARTS_CDN",type:"string",description:"The CDN URL of Highcharts scripts to use."},coreScripts:{envLink:"HIGHCHARTS_CORE_SCRIPTS",value:["highcharts","highcharts-more","highcharts-3d"],type:"string[]",description:"Highcharts core scripts to fetch."},modules:{envLink:"HIGHCHARTS_MODULES",value:["stock","map","gantt","exporting","export-data","parallel-coordinates","accessibility","annotations-advanced","boost-canvas","boost","data","draggable-points","static-scale","broken-axis","heatmap","tilemap","timeline","treemap","item-series","drilldown","histogram-bellcurve","bullet","funnel","funnel3d","pyramid3d","networkgraph","pareto","pattern-fill","pictorial","price-indicator","sankey","arc-diagram","dependency-wheel","series-label","solid-gauge","sonification","stock-tools","streamgraph","sunburst","variable-pie","variwide","vector","venn","windbarb","wordcloud","xrange","no-data-to-display","drag-panes","debugger","dumbbell","lollipop","cylinder","organization","dotplot","marker-clusters","hollowcandlestick","heikinashi"],type:"string[]",description:"Highcharts modules to fetch."},indicators:{envLink:"HIGHCHARTS_INDICATORS",value:["indicators-all"],type:"string[]",description:"Highcharts indicators to fetch."},scripts:{value:["https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.29.4/moment.min.js"],type:"string[]",description:"Additional direct scripts/optional dependencies (e.g. moment.js)."}},export:{infile:{value:!1,type:"string",description:"The input file name along with a type (json or svg). It can be a correct JSON or SVG file."},instr:{value:!1,type:"string",description:"An input in a form of a stringified JSON or SVG file. Overrides the --infile."},options:{value:!1,type:"string",description:"An alias for the --instr option."},outfile:{value:!1,type:"string",description:"The output filename along with a type (jpeg, png, pdf or svg). Ignores the --type flag."},type:{envLink:"EXPORT_DEFAULT_TYPE",value:"png",type:"string",description:"The format of the file to export to. Can be jpeg, png, pdf or svg."},constr:{envLink:"EXPORT_DEFAULT_CONSTR",value:"chart",type:"string",description:"The constructor to use. Can be chart, stockChart, mapChart or ganttChart."},defaultHeight:{envLink:"EXPORT_DEFAULT_HEIGHT",value:400,type:"number",description:"The default height of the exported chart. Used when not found any value set."},defaultWidth:{envLink:"EXPORT_DEFAULT_WIDTH",value:600,type:"number",description:"The default width of the exported chart. Used when not found any value set."},defaultScale:{envLink:"EXPORT_DEFAULT_SCALE",value:1,type:"number",description:"The default scale of the exported chart. Ranges between 1 and 5."},height:{type:"number",value:!1,description:"The default height of the exported chart. Overrides the option in the chart settings."},width:{type:"number",value:!1,description:"The width of the exported chart. Overrides the option in the chart settings."},scale:{value:!1,type:"number",description:"The scale of the exported chart. Ranges between 1 and 5."},globalOptions:{value:!1,type:"string",description:"A stringified JSON or a filename with options to be passed into the Highcharts.setOptions."},themeOptions:{value:!1,type:"string",description:"A stringified JSON or a filename with theme options to be passed into the Highcharts.setOptions."},batch:{value:!1,type:"string",description:'Starts a batch job. A string that contains input/output pairs: "in=out;in=out;..".'}},customCode:{allowCodeExecution:{envLink:"HIGHCHARTS_ALLOW_CODE_EXECUTION",value:!1,type:"boolean",description:"If set to true, allow for the execution of arbitrary code when exporting."},allowFileResources:{envLink:"HIGHCHARTS_ALLOW_FILE_RESOURCES",value:!0,type:"boolean",description:"Allow injecting resources from the filesystem. Has no effect when running as a server."},customCode:{value:!1,type:"string",description:"A function to be called before chart initialization. Can be a filename with the js extension."},callback:{value:!1,type:"string",description:"A JavaScript file with a function to run on construction."},resources:{value:!1,type:"string",description:"An additional resource in a form of stringified JSON. It can contain files, js and css sections."},loadConfig:{value:!1,type:"string",description:"A file that contains a pre-defined config to use."},createConfig:{value:!1,type:"string",description:"Allows to set options through a prompt and save in a provided config file."}},server:{enable:{envLink:"HIGHCHARTS_SERVER_ENABLE",value:!1,type:"boolean",cliName:"enableServer",description:"If set to true, starts a server on 0.0.0.0."},host:{envLink:"HIGHCHARTS_SERVER_HOST",value:"0.0.0.0",type:"string",description:"The hostname of the server. Also starts a server listening on the supplied hostname."},port:{envLink:"HIGHCHARTS_SERVER_PORT",value:7801,type:"number",description:"The port to use for the server. Defaults to 7801."},ssl:{enable:{envLink:"HIGHCHARTS_SERVER_SSL_ENABLE",value:!1,type:"boolean",cliName:"enableSsl",description:"Enables the SSL protocol."},force:{envLink:"HIGHCHARTS_SERVER_SSL_FORCE",value:!1,type:"boolean",cliName:"sslForced",description:"If set to true, forces the server to only serve over HTTPS."},port:{envLink:"HIGHCHARTS_SERVER_SSL_PORT",value:443,type:"number",cliName:"sslPort",description:"The port on which to run the SSL server."},certPath:{envLink:"HIGHCHARTS_SSL_CERT_PATH",value:"",type:"string",description:"The path to the SSL certificate/key."}},rateLimiting:{enable:{envLink:"HIGHCHARTS_RATE_LIMIT_ENABLE",value:!1,type:"boolean",cliName:"enableRateLimiting",description:"Enables rate limiting."},maxRequests:{envLink:"HIGHCHARTS_RATE_LIMIT_MAX",value:10,type:"number",description:"Max requests allowed in a one minute."},window:{envLink:"HIGHCHARTS_RATE_LIMIT_WINDOW",value:1,type:"number",description:"The time window in minutes for rate limiting."},delay:{envLink:"HIGHCHARTS_RATE_LIMIT_DELAY",value:0,type:"number",description:"The amount to delay each successive request before hitting the max."},trustProxy:{envLink:"HIGHCHARTS_RATE_LIMIT_TRUST_PROXY",value:!1,type:"boolean",description:"Set this to true if behind a load balancer."},skipKey:{envLink:"HIGHCHARTS_RATE_LIMIT_SKIP_KEY",value:"",type:"number|string",description:"Allows bypassing the rate limiter and should be provided with skipToken argument."},skipToken:{envLink:"HIGHCHARTS_RATE_LIMIT_SKIP_TOKEN",value:"",type:"number|string",description:"Allows bypassing the rate limiter and should be provided with skipKey argument."}}},pool:{initialWorkers:{envLink:"HIGHCHARTS_POOL_MIN_WORKERS",value:4,type:"number",description:"The number of initial workers to spawn."},maxWorkers:{envLink:"HIGHCHARTS_POOL_MAX_WORKERS",value:8,type:"number",description:"The number of max workers to spawn."},workLimit:{envLink:"HIGHCHARTS_POOL_WORK_LIMIT",value:40,type:"number",description:"The pieces of work that can be performed before restarting process."},queueSize:{envLink:"HIGHCHARTS_POOL_QUEUE_SIZE",value:5,type:"number",description:"The size of the request overflow queue."},timeoutThreshold:{envLink:"HIGHCHARTS_POOL_TIMEOUT",value:5e3,type:"number",description:"The number of milliseconds before timing out."},acquireTimeout:{envLink:"HIGHCHARTS_POOL_ACQUIRE_TIMEOUT",value:5e3,type:"number",description:"The number of milliseconds to wait for acquiring a resource."},reaper:{envLink:"HIGHCHARTS_POOL_ENABLE_REAPER",value:!0,type:"boolean",description:"Whether or not to evict workers after a certain time period."},benchmarking:{envLink:"HIGHCHARTS_POOL_BENCHMARKING",value:!1,type:"boolean",description:"Enable benchmarking."},listenToProcessExits:{envLink:"HIGHCHARTS_POOL_LISTEN_TO_PROCESS_EXITS",value:!0,type:"boolean",description:"Set to false in order to skip attaching process.exit handlers."}},payload:{},logging:{level:{envLink:"HIGHCHARTS_LOG_LEVEL",value:4,type:"number",cliName:"logLevel",description:"The log level (0: silent, 1: error, 2: warning, 3: notice, 4: verbose)."},file:{envLink:"HIGHCHARTS_LOG_FILE",value:"highcharts-export-server.log",type:"string",cliName:"logFile",description:"A name of a log file. The --logDest also needs to be set to enable file logging."},dest:{envLink:"HIGHCHARTS_LOG_DEST",value:"log/",type:"string",cliName:"logDest",description:"The path to store log files. Also enables file logging."}},ui:{enable:{envLink:"HIGHCHARTS_UI_ENABLE",value:!1,type:"boolean",cliName:"enableUi",description:"Enables the UI for the export server."},route:{envLink:"HIGHCHARTS_UI_ROUTE",value:"/",type:"string",cliName:"uiRoute",description:"The route to attach the UI to."}},other:{noLogo:{envLink:"HIGHCHARTS_NO_LOGO",value:!1,type:"boolean",description:"Skip printing the logo on a startup. Will be replaced by a simple text."}}};R.puppeteer.args.value.join(","),R.highcharts.version.value,R.highcharts.cdnURL.value,R.highcharts.modules.value,R.highcharts.scripts.value.join(","),R.export.type.value,R.export.constr.value,R.export.defaultHeight.value,R.export.defaultWidth.value,R.export.defaultScale.value,R.customCode.allowCodeExecution.value,R.customCode.allowFileResources.value,R.server.enable.value,R.server.host.value,R.server.port.value,R.server.ssl.enable.value,R.server.ssl.force.value,R.server.ssl.port.value,R.server.ssl.certPath.value,R.server.rateLimiting.enable.value,R.server.rateLimiting.maxRequests.value,R.server.rateLimiting.window.value,R.server.rateLimiting.delay.value,R.server.rateLimiting.trustProxy.value,R.server.rateLimiting.skipKey.value,R.server.rateLimiting.skipToken.value,R.pool.initialWorkers.value,R.pool.maxWorkers.value,R.pool.workLimit.value,R.pool.queueSize.value,R.pool.timeoutThreshold.value,R.pool.acquireTimeout.value,R.pool.reaper.value,R.pool.benchmarking.value,R.pool.listenToProcessExits.value,R.logging.level.value,R.logging.file.value,R.logging.dest.value,R.ui.enable.value,R.ui.route.value,R.other.noLogo.value;const L={},C=(e,t="")=>{Object.keys(e).forEach((o=>{if(!["puppeteer","highcharts"].includes(o)){const r=e[o];void 0===r.value?C(r,`${t}.${o}`):L[r.cliName||o]=`${t}.${o}`.substring(1)}}))};C(R);let _={toConsole:!0,toFile:!1,pathCreated:!1,levelsDesc:[{title:"error",color:"red"},{title:"warning",color:"yellow"},{title:"notice",color:"blue"},{title:"verbose",color:"gray"}],listeners:[]};for(const[e,t]of Object.entries(R.logging))_[e]=t.value;const O=(...e)=>{const[i,...n]=e,{level:s,levelsDesc:a}=_;if(0===i||i>s||s>a.length)return;const l=`${(new Date).toString().split("(")[0].trim()} [${a[i-1].title}] -`;_.listeners.forEach((e=>{e(l,n.join(" "))})),_.toFile&&(_.pathCreated||(!t(_.dest)&&o(_.dest),_.pathCreated=!0),r(`${_.dest}${_.file}`,[l].concat(n).join(" ")+"\n",(e=>{e&&(console.log(`[logger] Unable to write to log file: ${e}`),_.toFile=!1)}))),_.toConsole&&console.log.apply(void 0,[l.toString()[_.levelsDesc[i-1].color]].concat(n))},A=w(new URL("../.",import.meta.url)),I=(e,t=/\s\s+/g,o=" ")=>e.replaceAll(t,o).trim(),$=(e,t)=>{const o=["png","jpeg","pdf","svg"];if(t){const r=t.split(".").pop();o.includes(r)&&e!==r&&(e=r)}return{"image/png":"png","image/jpeg":"jpeg","application/pdf":"pdf","image/svg+xml":"svg"}[e]||o.find((t=>t===e))||"png"},P=(e=!1,t)=>{const o=["js","css","files"];let r=e,n=!1;if(t&&e.endsWith(".json"))try{e?e&&e.endsWith(".json")?r=N(i(e,"utf8")):(r=N(e),!0===r&&(r=N(i("resources.json","utf8")))):r=N(i("resources.json","utf8"))}catch(e){return O(3,"[cli] No resources found.")}else r=N(e),t||delete r.files;for(const e in r)o.includes(e)?n||(n=!0):delete r[e];return n?(r.files&&(r.files=r.files.map((e=>e.trim())),(!r.files||r.files.length<=0)&&delete r.files),r):O(3,"[cli] No resources found.")};function N(e,t){try{const o=JSON.parse("string"!=typeof e?JSON.stringify(e):e);return"string"!=typeof o&&t?JSON.stringify(o):o}catch(e){return!1}}const j=e=>{if(null===e||"object"!=typeof e)return e;const t=Array.isArray(e)?[]:{};for(const o in e)Object.prototype.hasOwnProperty.call(e,o)&&(t[o]=j(e[o]));return t},G=(e,t)=>JSON.stringify(e,((e,o)=>("string"==typeof o&&((o=o.trim()).startsWith("function(")||o.startsWith("function ("))&&o.endsWith("}")&&(o=t?`EXP_FUN${(o+"").replaceAll(/\n|\t|\r/g," ")}EXP_FUN`:void 0),"function"==typeof o?`EXP_FUN${(o+"").replaceAll(/\n|\t|\r/g," ")}EXP_FUN`:o))).replaceAll(/"EXP_FUN|EXP_FUN"/g,""),W=e=>!["false","undefined","null","NaN","0",""].includes(e)&&!!e,U=(e,t)=>{if(e&&"string"==typeof e)return(e=e.trim()).endsWith(".js")?!!t&&U(i(e,"utf8")):e.startsWith("function()")||e.startsWith("function ()")||e.startsWith("()=>")||e.startsWith("() =>")?`(${e})()`:e.replace(/;$/,"")};var M=(e,t)=>{const o="Too many requests, you have been rate limited. Please try again later.",r={max:t.maxRequests||30,window:t.window||1,delay:t.delay||0,trustProxy:t.trustProxy||!1,skipKey:t.skipKey||!1,skipToken:t.skipToken||!1};r.trustProxy&&e.enable("trust proxy");const i=y({windowMs:60*r.window*1e3,max:r.max,delayMs:r.delay,handler:(e,t)=>{t.format({json:()=>{t.status(429).send({message:o})},default:()=>{t.status(429).send(o)}})},skip:e=>!1!==r.skipKey&&!1!==r.skipToken&&e.query.key===r.skipKey&&e.query.access_token===r.skipToken&&(O(4,"[rate-limiting] Skipping rate limiter."),!0)});e.use(i),O(3,I(`[rate-limiting] Enabled rate limiting: ${r.max} requests\n      per ${r.window} minute per IP, trusting proxy:\n      ${r.trustProxy}.`))};async function F(e,t={}){return new Promise(((o,r)=>{const i=(e=>e.startsWith("https")?f:m)(e);i.get(e,t,(e=>{let t="";e.on("data",(e=>{t+=e})),e.on("end",(()=>{t||r("Nothing was fetched from the URL."),e.text=t,o(e)}))})).on("error",(e=>{r(e)}))}))}v.config();const q=c(A,".cache"),D={cdnURL:"https://code.highcharts.com/",activeManifest:{},sources:"",hcVersion:""};let V=!1;const J=()=>D.hcVersion=D.sources.substr(0,D.sources.indexOf("*/")).replace("/*","").replace("*/","").replace(/\n/g,"").trim(),z=async(e,t)=>{try{e.endsWith(".js")&&(e=e.substring(0,e.length-3)),O(4,`[cache] Fetching script - ${e}.js`);const o=t?{agent:t,timeout:+process.env.PROXY_SERVER_TIMEOUT||5e3}:{},r=await F(`${e}.js`,o);if(200===r.statusCode)return r.text;throw`${r.statusCode}`}catch(t){throw O(1,`[cache] Error fetching script ${e}.js: ${t}.`),t}},K=async(e,t)=>{const{coreScripts:o,modules:r,indicators:i,scripts:s}=e,a="latest"!==e.version&&e.version?`${e.version}/`:"";O(3,"[cache] Updating cache to Highcharts ",a);const l=[...o.map((e=>`${a}${e}`)),...r.map((e=>"map"===e?`maps/${a}modules/${e}`:`${a}modules/${e}`)),...i.map((e=>`stock/${a}indicators/${e}`))];let c;const p=process.env.PROXY_SERVER_HOST,d=process.env.PROXY_SERVER_PORT;p&&d&&(c=new T({host:p,port:+d}));const u={};try{return D.sources=(await Promise.all([...l.map((async t=>{const o=await z(`${e.cdnURL||D.cdnURL}${t}`,c);return"string"==typeof o&&(u[t.replace(/(.*)\/|(.*)modules\/|stock\/(.*)indicators\/|maps\/(.*)modules\//gi,"")]=1),o})),...s.map((e=>z(e,c)))])).join(";\n"),J(),n(t,D.sources),u}catch(e){O(1,"[cache] Unable to update local Highcharts cache.")}},X=async e=>{let r;const s=c(q,"manifest.json"),a=c(q,"sources.js");if(V=e,!t(q)&&o(q),t(s)){let t=!1;const o=JSON.parse(i(s));if(o.modules&&Array.isArray(o.modules)){const e={};o.modules.forEach((t=>e[t]=1)),o.modules=e}const{modules:n,coreScripts:l,indicators:c}=e,p=n.length+l.length+c.length;o.version!==e.version?(O(3,"[cache] Highcharts version mismatch in cache, need to re-fetch."),t=!0):Object.keys(o.modules||{}).length!==p?(O(3,"[cache] Cache and requested modules does not match, need to re-fetch."),t=!0):t=(e.modules||[]).some((e=>{if(!o.modules[e])return O(3,`[cache] The ${e} missing in cache, need to re-fetch.`),!0})),t?r=await K(e,a):(O(3,"[cache] Dependency cache is up to date, proceeding."),D.sources=i(a,"utf8"),r=o.modules,J())}else O(3,"[cache] Fetching and caching Highcharts dependencies."),r=await K(e,a);await(async(e,t)=>{const o={version:e.version,modules:t||{}};D.activeManifest=o,O(4,"[cache] writing new manifest");try{n(c(q,"manifest.json"),JSON.stringify(o),"utf8")}catch(e){O(1,`[cache] Error writing cache manifest: ${e}.`)}})(e,r)};var B=async e=>!!V&&await X(Object.assign(V,{version:e})),Y=()=>D,Q=()=>D.hcVersion;const Z=E(64).toString("base64url"),ee=H.join("tmp",`puppeteer-${Z}`),te=[`--user-data-dir=${H.join(ee,"profile")}`,"--autoplay-policy=user-gesture-required","--disable-background-networking","--disable-background-timer-throttling","--disable-backgrounding-occluded-windows","--disable-breakpad","--disable-client-side-phishing-detection","--disable-component-update","--disable-default-apps","--disable-dev-shm-usage","--disable-domain-reliability","--disable-extensions","--disable-features=AudioServiceOutOfProcess","--disable-hang-monitor","--disable-ipc-flooding-protection","--disable-notifications","--disable-offer-store-unmasked-wallet-cards","--disable-popup-blocking","--disable-print-preview","--disable-prompt-on-repost","--disable-renderer-backgrounding","--disable-session-crashed-bubble","--disable-setuid-sandbox","--disable-speech-api","--disable-sync","--hide-crash-restore-bubble","--hide-scrollbars","--ignore-gpu-blacklist","--metrics-recording-only","--mute-audio","--no-default-browser-check","--no-first-run","--no-pings","--no-sandbox","--no-zygote","--password-store=basic","--use-mock-keychain"],oe=b.fileURLToPath(new URL(".",import.meta.url)),re=e.readFileSync(oe+"/../templates/template.html","utf8");let ie;const ne=async()=>{if(!ie)return!1;const e=await ie.newPage();return await e.setContent(re),await e.addScriptTag({path:oe+"/../.cache/sources.js"}),await e.evaluate((()=>window.setupHighcharts())),e.on("pageerror",(async t=>{O(1,"[page error]",t),await e.$eval("#container",((e,t)=>{window._displayErrors&&(e.innerHTML=t)}),`<h1>Chart input data error</h1>${t.toString()}`)})),e},se=async()=>await ie.close();const ae=b.fileURLToPath(new URL(".",import.meta.url)),le=async(e,t,o)=>await e.evaluate(((e,t)=>window.triggerExport(e,t)),t,o);var ce=async(e,t,o)=>{const r=[],n=async e=>{for(const e of r)await e.dispose();await e.evaluate((()=>{const[,...e]=document.getElementsByTagName("script"),[,...t]=document.getElementsByTagName("style"),[...o]=document.getElementsByTagName("link");for(const r of[...e,...t,...o])r.remove()}))};try{const s=()=>{};O(4,"[export] Determining export path.");const a=o.export;await e.evaluate((()=>requestAnimationFrame((()=>{}))));const c=a?.options?.chart?.displayErrors&&Y().activeManifest.modules.debugger;await e.evaluate((e=>window._displayErrors=e),c);const p=()=>{};let d;if(t.indexOf&&(t.indexOf("<svg")>=0||t.indexOf("<?xml")>=0)){if(O(4,"[export] Treating as SVG."),"svg"===a.type)return t;d=!0;const o=()=>{};await e.setContent((e=>`\n<!DOCTYPE html>\n<html lang='en-US'>\n  <head>\n    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">\n    <title>Highcarts Export</title>\n  </head>\n  <style>\n    \n\nhtml, body {\n  margin: 0;\n  padding: 0;\n  box-sizing: border-box;\n}\n\n#table-div, #sliders, #datatable, #controls, .ld-row {\n  display: none;\n  height: 0;\n}\n\n#chart-container {\n  box-sizing: border-box;\n  margin: 0;\n  overflow: auto;\n  font-size: 0;\n}\n\n#chart-container > figure, div {\n  margin-top: 0 !important;\n  margin-bottom: 0 !important;\n}\n\n\n  </style>\n  <body>\n    <div id="chart-container">\n      ${e}\n    </div>\n  </body>\n</html>\n\n`)(t)),o()}else if(O(4,"[export] Treating as config."),a.strInj){const t=()=>{};await le(e,{chart:{height:a.height,width:a.width}},o),t()}else{t.chart.height=a.height,t.chart.width=a.width;const r=()=>{};await le(e,t,o),r()}p();const u=()=>{},h=o.customCode.resources;if(h){if(h.js&&r.push(await e.addScriptTag({content:h.js})),h.files)for(const t of h.files)try{const o=!t.startsWith("http");r.push(await e.addScriptTag(o?{content:i(t,"utf8")}:{url:t}))}catch(e){O(4,"[export] JS file not found.")}const t=()=>{};if(h.css){let t=h.css.match(/@import\s*([^;]*);/g);if(t)for(let i of t)i&&(i=i.replace("url(","").replace("@import","").replace(/"/g,"").replace(/'/g,"").replace(/;/,"").replace(/\)/g,"").trim(),i.startsWith("http")?r.push(await e.addStyleTag({url:i})):o.customCode.allowFileResources&&r.push(await e.addStyleTag({path:l.join(ae,i)})));r.push(await e.addStyleTag({content:h.css.replace(/@import\s*([^;]*);/g,"")||" "}))}t()}u();const g=d?await e.$eval("#chart-container svg:first-of-type",(async(e,t)=>({chartHeight:e.height.baseVal.value*t,chartWidth:e.width.baseVal.value*t})),parseFloat(a.scale)):await e.evaluate((async()=>{const{chartHeight:e,chartWidth:t}=window.Highcharts.charts[0];return{chartHeight:e,chartWidth:t}})),m=()=>{},f=Math.ceil(g?.chartHeight||a.height),v=Math.ceil(g?.chartWidth||a.width);await e.setViewport({height:f,width:v,deviceScaleFactor:d?1:parseFloat(a.scale)});const y=d?e=>{document.body.style.zoom=e,document.body.style.margin="0px"}:()=>{document.body.style.zoom=1};await e.evaluate(y,parseFloat(a.scale));const{height:b,width:w,x:T,y:x}=await(e=>e.$eval("#chart-container",(e=>{const{x:t,y:o,width:r,height:i}=e.getBoundingClientRect();return{x:t,y:o,width:r,height:Math.trunc(i>1?i:500)}})))(e);let k;d||await e.setViewport({width:Math.round(w),height:Math.round(b),deviceScaleFactor:parseFloat(a.scale)}),m();const S=()=>{};if("svg"===a.type)k=await(async e=>await e.$eval("#container svg:first-of-type",(e=>e.outerHTML)))(e);else if("png"===a.type||"jpeg"===a.type)k=await(async(e,t,o,r)=>await Promise.race([e.screenshot({type:t,encoding:o,clip:r}),new Promise(((e,t)=>setTimeout((()=>t(new Error("Rasterization timeout"))),1500)))]))(e,a.type,"base64",{width:v,height:f,x:T,y:x});else{if("pdf"!==a.type)throw`Unsupported output format ${a.type}`;k=await(async(e,t,o,r)=>await e.pdf({height:t+1,width:o,encoding:r}))(e,f,v,"base64")}return await e.evaluate((()=>{const e=Highcharts.charts;if(e.length)for(const t of e)t&&t.destroy(),Highcharts.charts.shift()})),S(),s(),await n(e),k}catch(t){return await n(e),O(1,`[export] Error encountered during export: ${t}`),t}};let pe,de=0,ue=0,he=0,ge=0,me=0,fe={},ve=!1,ye={};const be={create:async()=>{const e=x();let t=!1;const o=(new Date).getTime();try{if(t=await ne(),!t||t.isClosed())throw"invalid page";O(3,`[pool] Successfully created a worker ${e} - took ${(new Date).getTime()-o} ms.`)}catch(e){throw O(1,`[pool] Error creating a new page in pool entry creation! ${e}`),"Error creating page"}return{id:e,page:t,workCount:Math.round(Math.random()*(fe.workLimit/2))}},validate:e=>!(fe.workLimit&&++e.workCount>fe.workLimit)||(O(3,"[pool] Worker failed validation:",`exceeded work limit (limit is ${fe.workLimit})`),!1),destroy:e=>{O(3,`[pool] Destroying pool entry ${e.id}.`),e.page&&e.page.close()},log:(e,t)=>console.log(`${t}: ${e}`)},we=async e=>{pe=e.puppeteerArgs;try{await(async e=>{const t=[...te,...e||[]];if(!ie){let e=0;const o=async()=>{try{O(3,"[browser] attempting to get a browser instance (try",e+")"),ie=await S.launch({headless:"new",args:t,userDataDir:"./tmp/"})}catch(t){O(0,"[browser]",t),++e<25?(O(3,"[browser] failed:",t),await new Promise((e=>setTimeout(e,4e3))),await o()):O(0,"Max retries reached")}};try{await o()}catch(e){return O(0,"[browser] Unable to open browser"),!1}if(!ie)return O(0,"[browser] Unable to open browser"),!1}return ie})(pe)}catch(e){O(0,"[pool|browser]",e)}if(fe=e&&e.pool?{...e.pool}:{},O(3,"[pool] Initializing pool:",`min ${fe.initialWorkers}, max ${fe.maxWorkers}.`),ve)return O(4,"[pool] Already initialized, please kill it before creating a new one.");fe.listenToProcessExits&&(O(4,"[pool] Attaching exit listeners to the process."),process.on("exit",(async()=>{await Te()})),process.on("SIGINT",((e,t)=>{O(4,`The ${e} event with code: ${t}.`),process.exit(1)})),process.on("SIGTERM",((e,t)=>{O(4,`The ${e} event with code: ${t}.`),process.exit(1)})),process.on("uncaughtException",(async(e,t)=>{O(4,`The ${t} error, message: ${e.message}.`)})));try{ve=new k({...be,min:fe.initialWorkers,max:fe.maxWorkers,createRetryIntervalMillis:200,createTimeoutMillis:fe.acquireTimeout,acquireTimeoutMillis:fe.acquireTimeout,destroyTimeoutMillis:fe.acquireTimeout,idleTimeoutMillis:fe.timeoutThreshold,reapIntervalMillis:1e3,propagateCreateError:!1}),ve.on("createFail",((e,t)=>{O(1,`[pool] Error when creating worker of an event id ${e}:`,t)})),ve.on("acquireFail",((e,t)=>{O(1,`[pool] Error when acquiring worker of an event id ${e}:`,t)})),ve.on("destroyFail",((e,t,o)=>{O(1,`[pool] Error when destroying worker of an id ${t.id}, event id ${e}:`,o)})),ve.on("release",(e=>{O(4,`[pool] Releasing a worker of an id ${e.id}`)})),ve.on("destroySuccess",((e,t)=>{O(4,`[pool] Destroyed a worker of an id ${t.id}`)}));const e=[];for(let t=0;t<fe.initialWorkers;t++)e.push(await ve.acquire().promise);e.forEach((e=>{ve.release(e)})),O(3,`[pool] The pool is ready with ${fe.initialWorkers} initial resources waiting.`)}catch(e){throw O(1,`[pool] Couldn't create the worker pool ${e}`),e}};async function Te(){O(3,"[pool] Killing all workers."),He({});try{await se()}catch{return void O(4,"[pool] Worker has already been killed.")}return!ve||ve.destroy()}const xe=async(e,t)=>{let o;const r=e=>{throw++ge,o&&ve.release(o),"In pool.postWork: "+e};if(O(4,"[pool] Work received, starting to process."),fe.benchmarking&&ke(),++ue,!ve)return O(1,"[pool] Work received, but pool has not been started."),r("Pool is not inited but work was posted to it!");try{O(4,"[pool] Acquiring worker"),o=await ve.acquire().promise}catch(e){return r(`[pool] Error when acquiring available entry: ${e}`)}if(O(4,"[pool] Acquired worker handle"),!o.page)return r("Resolved worker page is invalid: pool setup is wonky");try{let i=(new Date).getTime();O(4,`[pool] Starting work on pool entry ${o.id}.`);const n=await ce(o.page,e,t);if(n instanceof Error)return"Rasterization timeout"===n.message&&(o.page.close(),o.page=await ne()),r(n);ve.release(o);const s=(new Date).getTime()-i;return he+=s,me=he/++de,O(4,`[pool] Work completed in ${s} ms.`),{data:n,options:t}}catch(e){r(`Error trying to perform puppeteer export: ${e}.`)}};function ke(){const{min:e,max:t,size:o,available:r,borrowed:i,pending:n,spareResourceCapacity:s}=ve;O(4,`[pool] The minimum number of resources allowed by pool: ${e}.`),O(4,`[pool] The maximum number of resources allowed by pool: ${t}.`),O(4,`[pool] The number of all resources in pool (free or in use): ${o}.`),O(4,`[pool] The number of resources that are currently available: ${r}.`),O(4,`[pool] The number of resources that are currently acquired: ${i}.`),O(4,`[pool] The number of callers waiting to acquire a resource: ${n}.`),O(4,`[pool] The number of how many more resources can the pool manage/create: ${s}.`)}function Se(){return ye}function He(e){ye=e}var Ee=()=>({min:ve.min,max:ve.max,size:ve.size,available:ve.available,borrowed:ve.borrowed,pending:ve.pending,spareResourceCapacity:ve.spareResourceCapacity}),Re=()=>ue,Le=()=>ge,Ce=()=>me,_e=()=>de;const Oe=process.env.npm_package_version,Ae=new Date;let Ie={};const $e=(e,t,o=[])=>{const r=j(e);for(const[e,n]of Object.entries(t))r[e]="object"!=typeof(i=n)||Array.isArray(i)||null===i||o.includes(e)||void 0===r[e]?void 0!==n?n:r[e]:$e(r[e],n,o);var i;return r};let Pe=!1;const Ne=async(e,t)=>{O(4,"[chart] Starting exporting process.");const o=((e,t={})=>{let o={};return e.svg?(o=t,o.export.type=e.type||e.export.type,o.export.scale=e.scale||e.export.scale,o.export.outfile=e.outfile||e.export.outfile,o.payload={svg:e.svg}):o=$e(t,e,["options","globalOptions","themeOptions","resources"]),o.export.outfile=o.export?.outfile||`chart.${o.export?.type||"png"}`,o})(e,Se()),r=o.export;return o.payload?.svg&&""!==o.payload.svg?Ue(o.payload.svg.trim(),o,t):r.infile&&r.infile.length?(O(4,"[chart] Attempting to export from an input file."),s(r.infile,"utf8",((e,r)=>e?O(1,`[chart] Error loading input file: ${e}.`):(o.export.instr=r,Ue(o.export.instr.trim(),o,t))))):r.instr&&""!==r.instr||r.options&&""!==r.options?(O(4,"[chart] Attempting to export from a raw input."),W(o.customCode?.allowCodeExecution)?We(o,t):"string"==typeof r.instr?Ue(r.instr.trim(),o,t):Ge(o,r.instr||r.options,t)):(O(1,I(`[chart] No input specified.\n      ${JSON.stringify(r,void 0,"  ")}.`)),t&&t(!1,{error:!0,message:"No input specified."}))},je=e=>{const{chart:t,exporting:o}=e.export?.options||N(e.export?.instr),r=N(e.export?.globalOptions);let i=((e,t=1)=>{const o=Math.pow(10,t||0);return Math.round(+e*o)/o})(e.export?.scale||o?.scale||r?.exporting?.scale||e.export?.defaultScale||1);return i>5?i=5:i<.1&&(i=1),{height:e.export?.height||o?.sourceHeight||t?.height||r?.exporting?.sourceHeight||r?.chart?.height||e.export?.defaultHeight||400,width:e.export?.width||o?.sourceWidth||t?.width||r?.exporting?.sourceWidth||r?.chart?.width||e.export?.defaultWidth||600,scale:i}},Ge=(e,t,o,r)=>{let{export:n,customCode:s}=e;const a="boolean"==typeof s.allowCodeExecution?s.allowCodeExecution:Pe;if(s){if("string"==typeof e.customCode.resources)e.customCode.resources=P(e.customCode.resources,W(e.customCode.allowFileResources));else if(!e.customCode.resources)try{const t=i("resources.json","utf8");e.customCode.resources=P(t,W(e.customCode.allowFileResources))}catch(e){O(3,"[chart] The default resources.json file not found.")}}else s=e.customCode={};if(!a&&s){if(s.callback||s.resources||s.customCode)return o&&o(!1,{error:!0,message:I("The callback, resources and customCode have been disabled for this\n            server.")});s.callback=!1,s.resources=!1,s.customCode=!1}if(t&&(t.chart=t.chart||{},t.exporting=t.exporting||{},t.exporting.enabled=!1),n.constr=n.constr||"chart",n.type=$(n.type,n.outfile),"svg"===n.type&&(n.width=!1),["globalOptions","themeOptions"].forEach((e=>{try{n&&n[e]&&("string"==typeof n[e]&&n[e].endsWith(".json")?n[e]=N(i(n[e],"utf8"),!0):n[e]=N(n[e],!0))}catch(t){n[e]={},O(1,`[chart] The ${e} not found.`)}})),s.allowCodeExecution&&(s.customCode=U(s.customCode,s.allowFileResources)),s&&s.callback&&s.callback?.indexOf("{")<0)if(s.allowFileResources)try{s.callback=i(s.callback,"utf8")}catch(e){O(2,`[chart] Error loading callback: ${e}.`),s.callback=!1}else s.callback=!1;e.export={...e.export,...je(e)},xe(n.strInj||t||r,e).then((e=>o(e))).catch((e=>(O(0,"[chart] When posting work:",e),o(!1,e))))},We=(e,t)=>{try{let o,r=e.export.instr||e.export.options;return"string"!=typeof r&&(o=r=G(r,e.customCode?.allowCodeExecution)),o=r.replaceAll(/\t|\n|\r/g,"").trim(),";"===o[o.length-1]&&(o=o.substring(0,o.length-1)),e.export.strInj=o,Ge(e,!1,t)}catch(o){const r=I(`Malformed input detected for ${e.export?.requestId||"?"}:\n      Please make sure that your JSON/JavaScript options\n      are sent using the "options" attribute, and that if you're using\n      SVG, it is unescaped.`);return O(1,r),t&&t(!1,JSON.stringify({error:!0,message:r}))}},Ue=(e,t,o)=>{const{allowCodeExecution:r}=t.customCode;if(e.indexOf("<svg")>=0||e.indexOf("<?xml")>=0)return O(4,"[chart] Parsing input as SVG."),Ge(t,!1,o,e);try{const r=JSON.parse(e.replaceAll(/\t|\n|\r/g," "));return Ge(t,r,o)}catch(e){return W(r)?We(t,o):o&&o(!1,{error:!0,message:I("Only JSON configurations and SVG is allowed for this server. If\n            this is your server, JavaScript exporting can be enabled by starting\n            the server with the --allowCodeExecution flag.")})}},Me={png:"image/png",jpeg:"image/jpeg",gif:"image/gif",pdf:"application/pdf",svg:"image/svg+xml"};let Fe=0;const qe=[],De=[],Ve=(e,t,o,r)=>{let i=!0;const{id:n,uniqueId:s,type:a,body:l}=r;return e.some((e=>{if(e){let r=e(t,o,n,s,a,l);return void 0!==r&&!0!==r&&(i=r),!0}})),i},Je=(e,t)=>{(()=>{const e=process.hrtime.bigint()})();const o=Ie,r=e.body,i=++Fe,n=x().replace(/-/g,"");let s=$(r.type);if(!r)return t.status(400).send(I("Body is required. Sending a body? Make sure your Content-type header\n        is correct. Accepted is application/json and multipart/form-data."));let a=N(r.infile||r.options||r.data);if(!a&&!r.svg)return O(2,I(`Request ${n} from ${e.headers["x-forwarded-for"]||e.connection.remoteAddress} was incorrect. Check your payload.`)),t.status(400).send(I("No correct chart data found. Please make sure you are using\n        application/json or multipart/form-data headers, and that the chart\n        data is in the 'infile', 'options' or 'data' attribute if sending\n        JSON or in the 'svg' if sending SVG."));let l=!1;if(l=Ve(qe,e,t,{id:i,uniqueId:n,type:s,body:r}),!0!==l)return t.send(l);let c=!1;e.socket.on("close",(()=>{c=!0})),O(4,`[export] Got an incoming HTTP request ${n}.`),r.constr="string"==typeof r.constr&&r.constr||"chart";const p={export:{instr:a,type:s,constr:r.constr[0].toLowerCase()+r.constr.substr(1),height:r.height,width:r.width,scale:r.scale||o.export.scale,globalOptions:N(r.globalOptions,!0),themeOptions:N(r.themeOptions,!0)},customCode:{allowCodeExecution:Pe,allowFileResources:!1,resources:N(r.resources,!0),callback:r.callback,customCode:r.customCode}};a&&(p.export.instr=G(a,p.customCode.allowCodeExecution));const d=$e(o,p);if(d.export.options=a,d.payload={svg:r.svg||!1,b64:r.b64||!1,dataOptions:N(r.dataOptions,!0),noDownload:r.noDownload||!1,requestId:n},r.svg&&(u=d.payload.svg,["localhost","(10).(.*).(.*).(.*)","(127).(.*).(.*).(.*)","(172).(1[6-9]|2[0-9]|3[0-1]).(.*).(.*)","(192).(168).(.*).(.*)"].some((e=>u.match(`xlink:href="(?:(http://|https://))?${e}`)))))return t.status(400).send("SVG potentially contain at least one forbidden URL in xlink:href element.");var u;Ne(d,((o,a)=>(e.socket.removeAllListeners("close"),c?O(3,I("[export] The client closed the connection before the chart was done\n          processing.")):a?(O(1,I(`[export] Work: ${n} could not be completed, sending:\n          ${a}`)),t.status(400).send(a.message)):o&&o.data?(s=o.options.export.type,Ve(De,e,t,{id:i,body:o.data}),o.data?r.b64?"pdf"===s?t.send(Buffer.from(o.data,"utf8").toString("base64")):t.send(o.data):(t.header("Content-Type",Me[s]||"image/png"),r.noDownload||t.attachment(`${e.params.filename||"chart"}.${s||"png"}`),"svg"===s?t.send(o.data):t.send(Buffer.from(o.data,"base64"))):void 0):(O(1,I(`[export] Unexpected return from chart generation, please check your\n          data Request: ${n} is ${o.data}.`)),t.status(400).send("Unexpected return from chart generation, please check your data.")))))};const ze=h();ze.disable("x-powered-by"),ze.use(u());const Ke=g.memoryStorage(),Xe=g({storage:Ke,limits:{fieldsSize:"50MB"}});ze.use(Xe.any()),ze.use(d.json({limit:"50mb"})),ze.use(d.urlencoded({extended:!0,limit:"50mb"})),ze.use(d.urlencoded({extended:!1,limit:"50mb"}));const Be=e=>O(1,`[server] Socket error: ${e}`),Ye=e=>{e.on("clientError",Be),e.on("error",Be),e.on("connection",(e=>e.on("error",(e=>Be(e)))))},Qe=async e=>{if(!e.enable)return!1;if(!e.ssl.enable&&!e.ssl.force){const t=m.createServer(ze);Ye(t),t.listen(e.port,e.host),O(3,`[server] Started HTTP server on ${e.host}:${e.port}.`)}if(e.ssl.enable){let t,o;try{t=await a.readFile(p.join(e.ssl.certPath,"server.key"),"utf8"),o=await a.readFile(p.join(e.ssl.certPath,"server.crt"),"utf8")}catch(t){O(1,`[server] Unable to load key/certificate from ${e.ssl.certPath}.`)}if(t&&o){const t=f.createServer(ze);Ye(t),t.listen(e.ssl.port,e.host),O(3,`[server] Started HTTPS server on ${e.host}:${e.ssl.port}.`)}}e.rateLimiting&&e.rateLimiting.enable&&![0,NaN].includes(e.rateLimiting.maxRequests)&&M(ze,e.rateLimiting),ze.use(h.static(p.join(A,"public"))),(e=>{!!e&&e.get("/health",((e,t)=>{t.send({status:"OK",bootTime:Ae,uptime:Math.floor(((new Date).getTime()-Ae.getTime())/1e3/60)+" minutes",version:Oe,highchartsVersion:Q(),averageProcessingTime:Ce(),performedExports:_e(),failedExports:Le(),exportAttempts:Re(),sucessRatio:_e()/Re()*100,pool:Ee()})}))})(ze),(e=>{e.post("/",Je),e.post("/:filename",Je)})(ze),(e=>{!!e&&e.get("/",((e,t)=>{t.sendFile(c(A,"public","index.html"))}))})(ze),(e=>{!!e&&e.post("/change-hc-version/:newVersion",(async(e,t)=>{const o=process.env.HIGHCHARTS_ADMIN_TOKEN;if(!o||!o.length)return t.send({error:!0,message:"Server not configured to do run-time version changes: HIGHCHARTS_ADMIN_TOKEN not set"});const r=e.get("hc-auth");if(!r||r!==o)return t.send({error:!0,message:"Invalid or missing token: set token in the hc-auth header"});const i=e.params.newVersion;if(i){try{await B(i)}catch(e){t.send({error:!0,message:e})}t.send({version:Q()})}else t.send({error:!0,message:"No new version supplied"})}))})(ze)};var Ze={startServer:Qe,getExpress:()=>h,getApp:()=>ze,use:(e,...t)=>{ze.use(e,...t)},get:(e,...t)=>{ze.get(e,...t)},post:(e,...t)=>{ze.post(e,...t)},enableRateLimiting:e=>M(ze,e)},et={log:O,server:Ze,singleExport:e=>{e.export.instr=e.export.instr||e.export.options,Ne(e,((e,t)=>{t&&(O(1,`[cli] ${t.message}`),process.exit(1));const{outfile:o,type:r}=e.options.export;n(o||`chart.${r}`,"svg"!==r?Buffer.from(e.data,"base64"):e.data),Te()}))},startExport:Ne,batchExport:async e=>{const t=[];for(let o of e.export.batch.split(";"))o=o.split("="),2===o.length&&t.push(new Promise(((t,r)=>{try{Ne({...e,export:{...e.export,infile:o[0],outfile:o[1]}},((e,o)=>{if(o)throw o;n(e.options.export.outfile,Buffer.from(e.data,"base64")),t()}))}catch(e){r(e)}})));Promise.all(t).then((()=>{Te()}))},startServer:Qe,killPool:Te,initPool:async(e={})=>{var t,o;return t=e.customCode&&e.customCode.allowCodeExecution,Pe=W(t),(o=e.logging&&parseInt(e.logging.level))>=0&&o<=_.levelsDesc.length&&(_.level=o),e.logging&&e.logging.dest&&((e,t)=>{if(_={..._,dest:e||_.dest,file:t||_.file,toFile:!0},0===_.dest.length)return O(1,"[logger] File logging init: no path supplied.");_.dest.endsWith("/")||(_.dest+="/")})(e.logging.dest,e.logging.file||"highcharts-export-server.log"),await X(e.highcharts||{version:"latest"}),await we({pool:e.pool||{initialWorkers:1,maxWorkers:1},puppeteerArgs:e.puppeteer?.args||[]}),He(e),e}};export{et as default};
//# sourceMappingURL=index.esm.js.map
