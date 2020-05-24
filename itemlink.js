
var xItemIDs={"17": "3e2a0639_75e10b4f_0.html"
	, "0": "4b2b0698_408d0718_0.html"
	, "2": "58ea06f7_70a90c48_0.html"
	, "1": "4b2d0699_500c07f3_0.html"
	, "3": "58ee06f8_3cff06d6_0.html"
	, "4": "4b2f069a_4589074f_0.html"
	, "5": "58f206f9_3c4f06e6_0.html"
	, "6": "4b31069b_456b074b_0.html"
	, "7": "58f606fa_4b4407ba_0.html"
	, "8": "4b33069c_5443081a_0.html"
	, "9": "4b35069d_2592055a_0.html"
	, "10": "58fe06fc_63910b25_0.html"
	, "14": "4b37069e_25060550_0.html"
	, "11": "590206fd_31ae061e_0.html"
	, "12": "678b075c_56e80843_0.html"
	, "13": "76d207bb_84280a3f_0.html"
	, "15": "86d7081a_84280a3f_0.html"
	, "16": "979a0879_46620757_0.html"
	, "20": "678d075d_63cb08b7_0.html"
	, "21": "76d607bc_114d038f_0.html"
	, "22": "86dd081b_114d038f_0.html"
	, "18": "4b2f0699_1b620497_0.html"
	, "36": "58f006f8_1b23049a_0.html"
	, "37": "676f0757_12c203a9_0.html"
	, "19": "4b31069a_11fb03a6_0.html"
	, "23": "58f406f9_11fb03a6_0.html"
	, "24": "67750758_11fb03a6_0.html"
	, "38": "76b407b7_1b1f0480_0.html"
	, "43": "4b33069b_1a110488_0.html"
	, "27": "58fa06fb_1e7a04c7_0.html"
	, "26": "677f075a_154803f0_0.html"
	, "25": "58f806fa_bcb02f4_0.html"
	, "28": "677b0759_2ae105b0_0.html"
	, "29": "76bc07b8_1693041d_0.html"
	, "30": "86bb0817_69a0237_0.html"
	, "31": "97780876_69a0237_0.html"
	, "32": "a8f308d5_69a0237_0.html"
	, "33": "bb2c0934_3ee106e0_0.html"
	, "34": "ce230993_b5202ea_0.html"
	, "39": "e1da09f3_386e06a5_0.html"
	, "40": "f64f0a52_208c050a_0.html"
	, "41": "b910ab1_208c050a_0.html"
	, "42": "21820b10_25390561_0.html"
	, "35": "e1d809f2_b94a0c00_0.html"};

var xBkmkIDs={};

$(document).ready(function(){

	var _urlTarget=function(sHref){
		var sUrl;
		var m=sHref.match(/^nyf:\/\/entry\?itemid=(\d+)/i);
		if(m && m.length>1){
			var sFn=xItemIDs[m[1]];
			if(sFn){
				sUrl=sFn;
			}else{
				alert('Cannot locate the target webpage. \n\n' + sHref);
			}
			if(!sUrl) sUrl='';
		}else{
			m=sHref.match(/^nyf:\/\/entry\?bmid=(\d+)/i);
			if(m && m.length>1){
				var sBmID=m[1];
				if(sBmID){
					var v=(xBkmkIDs[sBmID]||'').split('\t');
					if(v && v.length>2){
						var sItemID=parseInt(v[0]), sSsgName=v[1], sAnchor=v[2];
						var sFn=xItemIDs[sItemID];
						if(sFn){
							sUrl=sFn + '#' + sAnchor;
						}else{
							alert('Cannot locate the target webpage. \n\n' + sHref);
						}
					}
				}
				if(!sUrl) sUrl='';
			}
		}
		return sUrl;
	};

	var linkOf=function(p){
		var sUri='';
		while(p && !sUri){
			sUri=p.href||'';
			p=p.parentNode;
		}
		return sUri;
	};

	$('a').click(function(e){
		//2018.4.5 the target element could be a <SPAN> inside of <a>
		var sHref=linkOf(e.target);
		if(sHref){
			var sUrl=_urlTarget(sHref);
			if(sUrl){
				document.location.href=sUrl;
				return false;
			}else if(sUrl===''){
				return false; //2017.10.21 bad nyf:// links;
			}else{
				window.open(sHref);
				return false;
			}
		}else{
			return false;
		}
	});

});
