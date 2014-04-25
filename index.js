var rawDebug=require('debug')('accept');
var inspect=require('util').inspect;
var debug=function(message)
{
	rawDebug(inspect(message));
}

var startsWith=function(s, ins)
{
	return s.substring(0,ins.length)==ins;
};
var endsWith=function(s,ins)
{
	return s.substring(s.length-ins.length)==ins;
};
module.exports=function accept(h, closests, preferred)
{
	var accepts=h.split(',');
	var match;
	for(var i in closests)
	{
		var closest=closests[i];
		var closestMimes=closest.split('/');
		for(var j in accepts)
		{
			var accept=accepts[j].trim();
			var mediaRange=accept.split(';');
			var contentType=accept;
			var quality=1+0.01*(accepts.length-j);
			if(mediaRange.length>1)
			{
				contentType=mediaRange[0];
				if(mediaRange[1].substring(0,2)=='q=')
					quality=Number(mediaRange[1].substr(2));
			}
			var mimes=contentType.split('/');
			if(mimes[0]=='*')
				mimes[0]=closestMimes[0];
			if(mimes[1]=='*')
				mimes[1]=closestMimes[1];
			contentType=mimes.join('/');
			debug('testing :')
			debug({contentType:contentType, quality:quality});
			debug('against :'+closest)
			if((match==undefined || quality > match.quality) && closest==contentType || contentType==preferred)
			{
				debug(match);	
				match={contentType:contentType, quality:quality};
			}
			
		}
	}
	
	// console.log(match);	

	return match.contentType;
};
