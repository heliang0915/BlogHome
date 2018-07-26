cp -R /Users/hotread/work/learn/Blog/BlogHome/.nuxt/* /Users/hotread/work/learn/Blog/BlogSimple/.nuxt
cp -R /Users/hotread/work/learn/Blog/BlogHome/static/* /Users/hotread/work/learn/Blog/BlogSimple/static
cd /Users/hotread/work/learn/Blog/BlogSimple
git pull git@github.com:heliang0915/BlogSimple.git
git add .
git commit -m "提交"
git push  git@github.com:heliang0915/BlogSimple.git
