import * as http from 'http';

const app = http.createServer( onRequest );

function onRequest( $req: http.IncomingMessage, $res: http.ServerResponse ): void{
	console.log( 'request : ', $req.url );

	$res.writeHead( 200 );
	$res.write( JSON.stringify( { result: "OK" } ) );
	$res.end();
}

const PORT = 1234;

app.listen( PORT, onServer );

function onServer(): void{
	console.log( "Listening on : " + PORT );
}