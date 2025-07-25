import variable from '../models/user.js'
import adminUsers from '../models/adminUserSchema.js'
import item from '../models/products.js'
import bcrypt from 'bcrypt';
import { ObjectId } from 'mongodb'



export const adminpage = async (req, res) => {
   try {
      const userdata = await variable.find();
      const productsdata = await adminUsers.find();
      return res.render('admin-dash', { user: userdata, product: productsdata })
   }
   catch (err) {
      return res.send(err)
   }
}
const erase = async (req, res) => {
   // const data = req.body
   try {
      console.log(req.params.id);

      await variable.findByIdAndDelete(req.params.id)
      res.redirect('/admin')
   }
   catch (err) {
      res.send(err)
   }

}

const deletepr = async (req, res) => {
   try {
      await item.findByIdAndDelete(req.params.id)
      res.redirect('/admin')
   }
   catch (err) {
      res.send(err)
   }
}
// login and sign up

const login = (req, res) => {
   const message = req.flash("message")
   res.render('login',{message})
}

const sign = (req, res) => {
   res.render('sign-up')
}

// product

const addProduct = (req, res) => {
   res.render('add-product')
}

const addedProduct = async (req, res) => {
   const add = await item.insertOne(req.body)
   res.redirect('/admin')
}

const NewPage = async (req, res) => {
   const something = await item.find()
   res.render('productPage', { something })
}

const editedVersion = async (req, res) => {
   const prodid = req.params.id
   console.log(prodid);
   const prod = await item.findById(prodid);
   return res.render('prodEdit', { prod })
}

const updateProd = async (req, res) => {
   const userid = req.params.id
   console.log(userid);

   await item.findByIdAndUpdate(userid, {
      name: req.body.name,
      price: req.body.price,
      description: req.body.description
   })

   res.redirect('/admin')
}


const showProduct = async (req, res) => {
   if (req.session.admin) {
      res.redirect('/admin')
   }
   else {
      res.redirect('/')
   }

}

// user

const addUser = (req, res) => {
   if (req.session.admin) {
      res.render('add-user')
   }
   else {
      res.redirect("/")
   }

}


const user = (async (req, res) => {
   const { name, email, password } = req.body;
   const salt = 10
   const hashedPass = await bcrypt.hash(password, salt)
   const addOne = new variable({
      name,
      email,
      password: hashedPass
   });
   await addOne.save()
   console.log(addOne)
   res.redirect('/')

})

const loginuser = async (req, res) => {
   const { email, password } = req.body;
   console.log(email);

      const check = await variable.findOne({ email });
      if (!check) {
         req.flash("message","user not found");
         return res.redirect('/')

      }
      const hashedPass = await bcrypt.compare(password, check.password)
      if (!hashedPass) {
         req.flash("message","incorrect password")
         return res.redirect('/')
      }

      if (check.role == false) {
         res.redirect('/product')
      }
      req.session.admin = check;
      return res.redirect('/admin')
};



// add user by admin
const adminAddUser = (async (req, res) => {
   const { name, email, password, phone, status } = req.body
   const hashedPass = await bcrypt.hash(password, 10)
   const adminAdd = await variable.insertOne({
      name,
      email,
      password: hashedPass,
      phone,
      status

   })
   res.redirect('/admin')
})

const status = async (req, res) => {
   let id = req.params.id;
   
   try {
      await variable.findByIdAndUpdate(id, {
         status: req.body.status
      })
      res.json({ success: true })
   }
   catch (err) {
      res.status(500).json({ success: false, error: err.message });
      console.log(err);
      
   }
}


const showUsers = async (req, res) => {
   if (req.session.admin) {
      const users = await variable.find()
      const prod = await item.find()
      res.render('admin-dash', { users, prod })
   }
   else {
      res.redirect('/')
   }

}

const logout = (req, res) => {
   req.session.destroy(() => {
      console.log("Destroy");
      res.redirect('/')

   })

}

const update = async (req, res) => {
   const userid = req.params.id

   // const data = req.body
   const user = await variable.findById(userid)

   if (req.session.admin) {
      res.render('edit', { user })
   }
   else {
      res.redirect('/')
   }
}


export const updateUser = async (req, res) => {
   const userid = req.params.id
   await variable.findByIdAndUpdate(userid, {
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone
   })

   res.redirect('/admin')
}



export {
   login, sign, user, erase, loginuser, addUser, adminAddUser,
   showUsers, logout, update, addProduct, addedProduct, showProduct,
   editedVersion, updateProd, NewPage, deletepr,status
}





