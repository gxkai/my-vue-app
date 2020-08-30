#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

# 生成静态文件
cd ..
npm run build:storybook

# 进入生成的文件夹
cd storybook-static

git init
git add -A
git commit -m 'deploy'
## 如果发布到 https://<USERNAME>.github.io/<REPO>
git push -f git@github.com:gxkai/my-vue-app.git master:gh-pages

cd -
