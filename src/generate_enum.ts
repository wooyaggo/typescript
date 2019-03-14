import * as fs from "fs";

function getArg( $i: number, $message: string ){
	const value = process.argv[ $i ];

	if( value == null ){
		throw new Error( $message );
	}

	return value;
}

const i18nFile = getArg( 2, "I18n json file is missing." );
const enumFile = getArg( 3, "Enum file path is missing." );

var jsonString = fs.readFileSync( i18nFile ).toString();
var json = JSON.parse( jsonString );


var lines = [];
json.data.forEach( data => {
	lines.push( `	/// <summary> ${data.value} </summary>
	${data.text_id} = ${data._idx},` );
});


var body = `using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public enum I18nText {
	/// <summary> NULL </summary>
	NULL = -1,
${lines.join( "\n" )}
}`

fs.writeFileSync( enumFile, body );