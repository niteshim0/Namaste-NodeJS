## What is NVM ? 

- Node Version Manager (NVM) is a tool used to manage multiple active Node versions. 

- Node frameworks are rapidly evolving frameworks. What might work under one Node version is not guaranteed to work for another version of Node(difficult faced while creating this DevConnect Project). 

- Therefore, users need ways to switch between multiple versions of Node. At this point, NVM allows you to install different versions of Node, and switch between these versions depending on the project that you’re working on via the command line.

## NVM Installation and Usage

As for how to install NVM, there are different ways to do it. 
Firstly we need to download the latest NVM installation file using the link below.

In the [!https://github.com/coreybutler/nvm-windows#readme]nvm-windows repository Readme, click on “Download Now!”:


### NVM Windows Repository

- In the latest release, you’ll find different assets. Click on the nvm-setup.exe asset which is the installation file for the tool.


- Open the file that you have downloaded, and complete the installation wizard. When done, you can confirm that nvm has been installed by running:

```bash
nvm -v || nvm --version
```

- If nvm was installed correctly, this command will show you the nvm version installed.

### NVM Basic Commands

With nvm installed, you can now install, uninstall, and switch between different Node versions in your Windows, Linux, or Mac device.

- You can install Node versions:
```bash
nvm install vX.Y.Z
```

- You can install latest LTS version of node (Long Term Support):
```bash
nvm install --lts
```

- You can list locally installed versions of node:
```bash
nvm list || nvm ls
```

- You can list remove available versions of node:
```bash
nvm list available || nvm ls-remote
```

- You want to use a specific version at any point, you can run the following in your terminal:
```bash
nvm use vA.B.C
```

- You can set default version of node:
```bash
nvm alias default vX.Y.Z
```

- To launch a file with a specific version without setting it default:
```bash
nvm run vA.B.C index.js
```

- You can uninstall a version of Node:
```bash
nvm uninstall vX.Y.Z
```