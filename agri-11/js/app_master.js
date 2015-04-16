//------------------------------------
//  app_master.js ver:1.0
// @date    : 2015-04-16
//------------------------------------

var MasterApp = (function () {
    function MasterApp() {
    }
    MasterApp.prototype.init_proc = function (  model ) {
    	var parent_app=this;
		var query = new Parse.Query( model );
		query.limit(1);
		query.find({
		   success: function(todos) {
		   	   if(todos.length < 1){
				   alert('error, Nothing data.');
				   parent_app.add_master(mClassNameMaster);
		   	   }else{
					var sMcid = todos[0].get("mc_id");
					var nMoi  = todos[0].get("moi_num");
					var nKnum  = todos[0].get("kai_num_1");
					var nVnum1 = todos[0].get("vnum_1");
					var nVnum2 = todos[0].get("vnum_2");
					var nVnum3 = todos[0].get("vnum_3");
					var nVnum4 = todos[0].get("vnum_4");
//console.log(todos[0]);
//console.log(todos[0].id);
//console.log( sMcid );
					$('input#id-text-objctid').val(todos[0].id);
					$('font#id-font-mcid').text(sMcid);
					$('input#txt_moi_num').val(nMoi);
					$('input#txt_kai_num_1').val(nKnum);
					$('#txt_vnum_1').val(nVnum1);
					$('#txt_vnum_2').val(nVnum2);
					$('#txt_vnum_3').val(nVnum3);
					$('#txt_vnum_4').val(nVnum4);
		   	   }
		   },
		   error: function(object, error) {
			   alert('error');
		   }
		});
    };    

    MasterApp.prototype.add_master = function (  className ) {
    	var parent_app=this;
    	
		var GameScore = Parse.Object.extend(className);
		var master = new GameScore();
		
		master.set("mc_id", 1);
		master.set("mc_name", "micon-1");
		master.set("moi_num", mInit_moi_num);

		master.set("kai_num_1", mInit_kai_nm_1 );
		master.set("vnum_1"  , mInit_vnm_1);
		master.set("vnum_2"  , mInit_vnm_2);
		master.set("vnum_3"  , mInit_vnm_3);
		master.set("vnum_4"  , mInit_vnm_4);
		
		master.save(null, {
		  success: function(master) {
		    alert('New object created with objectId: ' + master.id);
		    $('input#id-text-objctid').val(master.id);
		  },
		  error: function(master, error) {
		    alert('Failed to create new object, with error code: ' + error.message);
		  }
		});
    };    
    MasterApp.prototype.update_master = function (  className , sid) {
    	var parent_app=this;
		var GameScore = Parse.Object.extend(className);
		var master = new GameScore();
		
		master.set("id", sid);
		var sMoi= $('input#txt_moi_num').val();
		var sKnum= $('input#txt_kai_num_1').val();
		var vnum1= $('#txt_vnum_1').val();
		var vnum2= $('#txt_vnum_2').val();
		var vnum3= $('#txt_vnum_3').val();
		var vnum4= $('#txt_vnum_4').val();

		master.set("moi_num", parseInt(sMoi));
		master.set("kai_num_1", parseInt(sKnum));
		master.set("vnum_1", parseInt(vnum1));
		master.set("vnum_2", parseInt(vnum2));
		master.set("vnum_3", parseInt(vnum3));
		master.set("vnum_4", parseInt(vnum4));
		
		master.save(null, {
		  success: function(master) {
		    alert('Success, Update master.' );
		  },
		  error: function(master, error) {
		    alert('Failed to create new object, with error code: ' + error.message);
		  }
		});
    };    
    return MasterApp;
})();

onload = function() {
    Parse.initialize(mAPP_ID, mJS_KEY);
	var TodoModel = Parse.Object.extend({
		className: mClassNameMaster
	});
	var master = new MasterApp( );
	master.init_proc(TodoModel);
	document.querySelector('a#id-a-update').onclick = function() {
		var sid = $('input#id-text-objctid').val();
		master.update_master(mClassNameMaster, sid);
	};
};


