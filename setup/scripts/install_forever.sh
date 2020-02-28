
npm install forever -g;

forever start -l forever.log -o forever_out.log -e forever_err.log --append /hom
e/api_erp_cloud/server.js;

forever stopall;
