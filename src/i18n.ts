import * as fs from "fs";
import * as path from "path";
import Load from "./spreadsheet";

function getArg( $i: number, $message: string ){
	const value = process.argv[ $i ];

	if( value == null ){
		throw new Error( $message );
	}

	return value;
}

const id_list = getArg( 2, "Wrong Format. Use spreadsheet.worksheet,spreadsheet.worksheet" );
const saveFile = getArg( 3, "Save path is missing." );

var list = [];

id_list.split( "," ).forEach( id => {
	var arr = id.split( "." );
	list.push( {
		spreadsheet_id : arr[ 0 ],
		worksheet_id : arr[ 1 ],
	})
});

start();

async function start(){
	// console.log( "spreadsheet_id : " + spreadsheet_id );
	// console.log( "worksheet_id : " + worksheet_id );
	// console.log( "dir : " + dir );

	// Load( spreadsheet_id, worksheet_id, ( rows ) => {
	// 	console.log( rows[ 0 ] );
	// 	console.log( rows[ 1 ] );
	// })

	var json = {
		data: [],
	}

	for( let i = 0 ; i < list.length ; i++ ){
		var { worksheet_id, spreadsheet_id } = list[ i ];
		console.log( "spreadsheet_id : " + spreadsheet_id );
		console.log( "worksheet_id : " + worksheet_id );

		await new Promise( $done => {
			Load( spreadsheet_id, worksheet_id, ( $rows ) =>{
				json.data = json.data.concat( $rows );

				$done();
			})
		})
	}

	for( let i = 0 ; i < json.data.length ; i++ ){
		json.data[ i ]._idx = i;
	}
	
	console.log( "Complete : " + saveFile );

	fs.writeFileSync( saveFile, JSON.stringify( json, null, "\t" ) );
}