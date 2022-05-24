# Deployment ready (React+TS+Vite)

GitHub page should be available here: https://maifeeulasad.github.io/react-pipeline


## Steps to reproduce:
 - Get `ssh-keygen`
 - Run this command `ssh-keygen -t rsa -b 4096`
   - Save it to a nice place
   - Give it some cool and understandable name(mainly for later usage - I had key pair named *okjanu* from 2018, I have no idea what do they do, but it's under folder `imporatnt`) 
   -  Backup to some cloud store and remove it from local storage
 - Go to *secrets* under *settings*
   - For this repo, I went to: https://github.com/maifeeulasad/react-pipeline/settings/secrets/actions
   - Open the private key, *file without `.pub` extension*, with any text editor or in terminal
   -  Paste it write there
 - Go to *deploy keys* under *settings*
   - For this repo: https://github.com/maifeeulasad/react-pipeline/settings/keys
   - Open the public key and paste there
   - Give it write access(must)

## Some stuff:
 - GA included, please change it accordingly, at the very bottom of `index.html`. Here: https://github.com/maifeeulasad/react-pipeline/blob/5e12fd6a332153295a6fd93f4fa257b28070cbb5/public/index.html#L45
