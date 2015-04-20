//------------------------------------
//   ver:1.0
// @date    : 2015-04-16
//------------------------------------


var AppValve = (function () {
    function AppValve() {
    }

    AppValve.prototype.get_zeroStr = function ( src) {
    	var ret='00';
    	ret= ret +src;
    	var iSrc= ret.length;
    	ret= ret.substr( iSrc-2 );
    	return ret;
    };
    AppValve.prototype.get_dateStr = function ( src) {
    	var ret='';
    	if(src.length >=14){
	    	ret=src.substr( 4,2 );
	    	ret=ret + "-"+src.substr( 6,2 );
	    	ret=ret + " "+src.substr( 8,2 );
	    	ret=ret + ":"+src.substr( 10,2 );
	    	ret=ret + ":"+src.substr( 12,2 );
    	}
    	return ret;
    };
    AppValve.prototype.get_nowDate = function () {
    	var ret='';
	 	var  dd = new Date();
	 	var sYY = new String(dd.getFullYear() );
	 	var sMM = new String(dd.getMonth()+1 );
	 	sMM= this.get_zeroStr(sMM);
	 	var sDD = new String(dd.getDate() );
	 	sDD= this.get_zeroStr(sDD);
	 	ret = sYY+ sMM + sDD + '000000';
		return ret;
    };
    
    AppValve.prototype.get_array = function (  todos , iSen) {
    	var ret= new Array();
		for (var i = 0; i < todos.length; i++) {
			var sSnum1 = todos[i].get("snum1");
			var sSnum2 = todos[i].get("snum2");
			var sSnum3 = todos[i].get("snum3");
			var sSnum4 = todos[i].get("snum4");
			var nDate = todos[i].get("dtnum");
			sDate= new String(nDate);
			sDate = sDate.substr(8, 4 );
			if(iSen==1){
				ret[i] = [ parseInt(sDate) , sSnum1];
			}else if(iSen==2){
				ret[i] = [ parseInt(sDate) , sSnum2];
			}else if(iSen==3){
				ret[i] = [ parseInt(sDate) , sSnum3];
			}else if(iSen==4){
				ret[i] = [ parseInt(sDate) , sSnum4];
			}
// console.log ('date='+sDate + ', s1='+sSnum1 +",s2="+ sSnum2);
		}
		return ret;
    };

	AppValve.prototype.conv_strOpen = function (  src ) {
		var ret='-';
		if(src=="1"){
			ret='<font color="blue">Open</font>'
		}
		
		return ret;
	};
    AppValve.prototype.add_table = function (  todos ) {
    	var tbl= $('#id-tbody-valve');
    	var iCt=0;
    	for (var i = 0; i < todos.length; i++) {
			var sSnum1 = todos[i].get("vnum1");
			var sSnum2 = todos[i].get("vnum2");
			var sSnum3 = todos[i].get("vnum3");
			var sSnum4 = todos[i].get("vnum4");
			var nDate = todos[i].get("dtnum");
			var sDate = new String(nDate);
			    sDate = this.get_dateStr( sDate );
			var objTr =  $('<tr></tr>');
			tbl.append( objTr );
			var objMc    =  $('<td>'+ mMC_ID +'</td>');
			objTr.append( objMc );
			var objSnum1 =  $('<td>'+ this.conv_strOpen(sSnum1) +'</td>');
			objTr.append( objSnum1 );
			var objSnum2 =  $('<td>'+ this.conv_strOpen(sSnum2) +'</td>');
			objTr.append( objSnum2 );
			var objSnum3 =  $('<td>'+ this.conv_strOpen(sSnum3) +'</td>');
			objTr.append( objSnum3 );
			var objSnum4 =  $('<td>'+ this.conv_strOpen(sSnum4) +'</td>');
			objTr.append( objSnum4);
			var objDate =  $('<td>'+ sDate +'</td>');
			objTr.append( objDate );
			if(iCt >= 50 ){
			  return false;
			}
			iCt ++;
    	}
    };

    AppValve.prototype.put_data = function (  model ) {
    	var parent_app=this;
		var query = new Parse.Query( model );
		
		var sDate  = this.get_nowDate();
		var nBef  =parseInt(sDate);
		query.equalTo("mc_id", mMC_ID);
		query.descending("dtnum");
		query.limit(50);
		query.find({
		   success: function(todos) {
		   	   if(todos.length < 1){
//				   alert('error, Nothing data.');
				   console.log('error, Nothing data.');
		   	   }else{
		   	   	   parent_app.add_table(todos);
		   	   }
		   },
		   error: function(object, error) {
			   alert('error');
		   }
		});
    };    
    return AppValve;
})();

