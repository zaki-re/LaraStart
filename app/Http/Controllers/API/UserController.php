<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Hash;
use Intervention\Image\Facades\Image as Image;


class UserController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api');
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //$this->authorize('isAdmin');
        if(Gate::allows('isAdmin') || Gate::allows('isAuthor') ){
            return User::latest()->paginate(10);

        }
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {

        $this->validate($request,[

            'name'=>"required|string|max:191",
            'email'=>"required|string|email|max:191|unique:users",
            'password'=>"required|string|min:6",

        ]);
        return User::create([
           'name' =>$request['name'], 
           'email' =>$request['email'], 
           'type' =>$request['type'], 
           'bio' =>$request['bio'], 
           'password' =>Hash::make($request['password']), 
           'photo' =>$request['photo'], 

        ]);
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
    public function updateProfile(Request $request)
    {
        $user = auth('api')->user();

        $this->validate($request,[

            'name'=>"required|string|max:191",
            'email'=>"required|string|email|max:191|unique:users,email,".$user->id,
            'password'=>"sometimes|required|string|min:6",

        ]);
        $currentPhoto = $user->photo;
        if ($request->photo != $currentPhoto) {
            $name= time().'.' . explode('/', explode(':', substr($request->photo, 0, strpos($request->photo, ';')))[1])[1];
            Image::make($request->photo)->save(public_path('img/profile/').$name);
            $request->merge(['photo' => $name]);
            

            $userPhoto = public_path('img/profile/').$currentPhoto;

            if(file_exists($userPhoto)){
                @unlink($userPhoto);
            }
        }
        if (!empty($request->password)) {
            $request->merge(['password' => Hash::make($request['password'])]);
        }

        $user->update($request->all());
        return ['message'=>'success','user'=>$request->photo];
    }

    public function profile()
    {
        return auth('api')->user();
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
        

        $user=User::findOrFail($id);
        $this->validate($request,[

            'name'=>"required|string|max:191",
            'email'=>"required|string|email|max:191|unique:users,email,".$user->id,
            'password'=>"sometimes|min:6",

        ]);
        $user->update($request->all());
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $this->authorize('isAdmin');
        $user = User::findOrFail($id);
        $user->delete();
        return ['message'=> 'user deleted'];
    }
}
