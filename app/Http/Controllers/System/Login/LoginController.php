<?php

namespace App\Http\Controllers\System\Login;

use App\Models\System\ConfigEmail;
use App\Models\System\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;

class LoginController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    private function generatePassword($lenght)
    {

        $code = '';

        $character = "!'#$%&/()=?¡*][_:;abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

        $max = strlen($character) - 1;

        for($i = 0; $i < $lenght; $i++) {

            $code .= $character[rand(0, $max)];

        }

        return $code;
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $user = User::with('role')->where( 'email', $request->input('email' ) )
                        ->where('state', 1)->get();

        if ( count( $user ) > 0 ) {

            if( Hash::check( $request->input('password'), $user[0]->password  ) ) {

                return response()->json(['success' => true, 'user' => $user[0]]);

            } else {

                return response()->json(['success' => false]);

            }

        } else {

            return response()->json(['success' => false]);

        }
    }

    public function resetPassword(Request $request)
    {

        $user = User::where( 'email', $request->input('email_r' ) )->get();

        if ( count( $user ) > 0 ) {

            $user = User::find($user[0]->iduser);

            if ($user->email != null && $user->email != '') {

                $user->token = md5(time().rand());

                if ($user->save()) {

                    $configSystemEmail = ConfigEmail::all();

                    config([

                        'mail.driver' => $configSystemEmail[0]->driver,
                        'mail.host' => $configSystemEmail[0]->server,
                        'mail.port' => $configSystemEmail[0]->port,
                        'mail.from'=> [
                            'address' => $configSystemEmail[0]->useremail,
                            'name' => 'ENCOMAQ',
                        ],
                        'mail.username' => $configSystemEmail[0]->useremail,
                        'mail.password' => $configSystemEmail[0]->passwordemail,
                        'mail.encryption' => $configSystemEmail[0]->encryptation,

                    ]);

                    $email = $user->email;
                    $token = $user->token;
                    $username = $user->personname . ' ' . $user->lastnameperson;

                    Mail::send('mail_password.bodyEmail_1',['token' => $token, 'username' => $username] , function($message) use ($email)
                    {
                        $message->to($email)->subject('Verificación de Correo Electrónico');
                    });

                    return response()->json(['success' => true]);

                } else {

                    return response()->json(['success' => false]);

                }


            } else {

                return response()->json(['success' => false, 'email' => false]);

            }

        } else {

            return response()->json(['success' => false, 'user' => false]);

        }

    }

    public function changePassword($token)
    {

        $user = User::where('token', $token)->get();

        if ( count( $user ) > 0 ) {

            $user = User::find($user[0]->iduser);

            if ($user->email != null && $user->email != '') {

                $newPassword = $this->generatePassword(10);

                $user->password = Hash::make($newPassword);

                if ($user->save()) {

                    $configSystemEmail = ConfigEmail::all();

                    config([

                        'mail.driver' => $configSystemEmail[0]->driver,
                        'mail.host' => $configSystemEmail[0]->server,
                        'mail.port' => $configSystemEmail[0]->port,
                        'mail.from'=> [
                            'address' => $configSystemEmail[0]->useremail,
                            'name' => 'ENCOMAQ',
                        ],
                        'mail.username' => $configSystemEmail[0]->useremail,
                        'mail.password' => $configSystemEmail[0]->passwordemail,
                        'mail.encryption' => $configSystemEmail[0]->encryptation,

                    ]);

                    $email = $user->email;
                    $username = $user->personname . ' ' . $user->lastnameperson;

                    Mail::send('mail_password.bodyEmail_2',['newPassword' => $newPassword, 'username' => $username] , function($message) use ($email)
                    {
                        $message->to($email)->subject('Actualización de Contraseña exitoso');
                    });

                    return response()->json(['success' => true]);

                } else {

                    return response()->json(['success' => false]);

                }

            } else {

                return response()->json(['success' => false, 'email' => false]);

            }

        } else {

            return response()->json(['success' => false, 'user' => false]);

        }

    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
