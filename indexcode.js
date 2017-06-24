function setup() {
    $('button#add2ipfs').on('click', function(e) {
        e.preventDefault();
        add2ipfs();
        return false
    })
}
$(document).ready(setup);

function indicate(cls, text) {
    $('#alert').addClass('alert-' + cls);
    $('#alert').text(text);
    console.log(cls+":"+text);
}

function add2ipfs() {
    $('result').hide();

    var url = $('input#url').val().trim();
    if (!url || url.length < 1) {
        return indicate('danger', 'error: url field is empty')
    }

    var filename = $('input#filename').val().trim();
    if (!filename || filename.length < 1) {
        filename = urlFilename(url)
    }

    var endpoint = $('input#api-endpoint').val().trim();
    if (!endpoint) {
        return indicate('danger', 'invalid api endpoint')
    }

    var ipfs = ipfsAPI(endpoint);
    indicate('info', 'working...');

    addURL(ipfs, url, filename, function(err, path) {
        if (err) return indicate('danger', 'error: ' + err);

        indicate('success', 'added '+ path);
        console.log(path);
        setResult(path)
    })
}

function addURL(ipfs, url, filename, cb) {
    console.log("ipfs add -w", url);
    ipfs.add(url, {pin:false}, function(err, res) {
        if (err) return err;

        if (!Array.isArray(res)) {
            res = [res]
        }

        console.log(res);
        var path = '/ipfs/'+ res.Hash +'/'+ filename;
        console.log(path);
        wrapObject(ipfs, res.pop().Hash, filename, cb)
    })
}

// this can go away once https://github.com/ipfs/js-ipfs-api/issues/140 is fixed
function wrapObject(ipfs, hash, name, cb) {

    var emptyDir = 'QmUNLLsPACCz1vLxQVkXqqLX5R1X345qqfHbsf67hvA3Nn';
    var args = [name, hash];
    console.log('ipfs object patch', emptyDir, args);
    ipfs.object.patch(emptyDir, args, function(err, data) {
        if (err) return cb(err);

        console.log(data);
        var path = '/ipfs/'+ data.Hash +'/'+ name;
        console.log(path);
        cb(null, path)
    })
}

function urlFilename(url) {
    var path = mklocation(url).pathname;
    return path.split('/').pop()
}

function mklocation(href) {
    var l = document.createElement('a');
    l.href = href;
    return l
}

function setResult(path) {
    $('#ipfs-path').text(path);
    $('#result').show();

    var local = window.location.protocol +'//'+ window.location.host + path;
    $('#ipfs-gway-local').text(local);
    $('#ipfs-gway-local').attr('href', local);
    $('#iframe-local').attr('src', local);

    var global = "https://ipfs.io" + path;
    $('#ipfs-gway-global').text(global);
    $('#ipfs-gway-global').attr('href', global);
    $('#iframe-global').attr('src', global)
}
