const GoogleSpreadsheet = require( "google-spreadsheet" );
const credentials = require( "../credentials.json" );

export default async function( spreadsheet_id: string, worksheet_id: string, done: ( text: Array<object> ) => void ){
	const doc = new GoogleSpreadsheet( spreadsheet_id );

	await new Promise( $done => {
		doc.useServiceAccountAuth( credentials, ( $err ) =>{
			if( $err ){
				console.log( $err );

				return;
			}

			$done();
		} );
	})

	let worksheet;
	await new Promise( $done => {
		doc.getInfo( ( $err, $info ) => {
			if( $err ){
				console.log( $err );

				return;
			}

			$info.worksheets.forEach( $sheet =>{
				if( $sheet.title == worksheet_id ){
					worksheet = $sheet;
				}
			})

			if( worksheet == null ){
				console.log( "Not found Worksheet : " + worksheet_id );
			}

			$done();
		})
	})

	let COLS = 0;

	const header = {};
	// Header
	await new Promise( $done => {
		worksheet.getCells({
			"min-row": 1,
			"max-row": 1,
			"return-empty": true,
		}, ( $err, $cells ) => {
			if( $err ){
				console.log( $err );
	
				return;
			}
	
			$cells.forEach( ( $cell, $i ) => {
				const value = $cell.value;
	
				if( $cell == null || value == null ){
					return;
				}
				
				if( value == "" ){
					return;
				}
				
				if( value[ 0 ] == "#" ){
					return;
				}
				
				header[ $cell.value ] = $i;
				header[ $i ] = $cell.value;

				if( COLS < $i + 1 ){
					COLS = $i + 1;
				}
			})

			$done();
		})
	})

	let offset = 1;
	const OFFSET_SIZE = 500;
	const OFFSET_LIMIT = worksheet.rowCount;

	var rows = [];

	let end = false;
	while( !end ){

		await new Promise( $done => {
			const option = {
				"min-row": offset + 1,
				"max-row": Math.min( offset + OFFSET_SIZE, worksheet.rowCount ),
				"min-col": 1,
				"max-col": COLS,
				"return-empty": true,
			};

			worksheet.getCells( option, ( $err, $cells ) => {
				if( $err ){
					console.log( $err );
				}

				let obj = {};
				$cells.forEach( ( $cell, $i ) => {
					const head = header[ $cell.col - 1 ];

					if( head == null || head == undefined ){
						return;
					}

					let value = $cell.value;

					if( $cell.numericValue != null ){
						value = $cell.numericValue;
					}

					obj[ head ] = value;

					if( $i % COLS == ( COLS -1 ) ){
						if( obj[ header[ "0" ] ] != "" ){
							// parseRow( obj );
							rows.push( obj );
						}
						else{
							end = true;
						}

						obj = {};
					}
				})

				offset += OFFSET_SIZE;
		
				if( offset > OFFSET_LIMIT )
					end = true;
				
				$done();
			})
		})
	}

	done( rows );
}