(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[12],{187:function(t,e,n){},273:function(t,e,n){"use strict";n.r(e);var s=n(16),a=n(17),r=n(25),c=n(24),i=n(2),o=n.n(i),u=n(23),l=n(9),d=n(20),j=(n(187),n.p+"static/media/logo.fc16259f.png"),b=n(4),h=function(t){Object(r.a)(n,t);var e=Object(c.a)(n);function n(){return Object(s.a)(this,n),e.apply(this,arguments)}return Object(a.a)(n,[{key:"render",value:function(){var t=this;return Object(b.jsx)("div",{className:"container-fluid background",children:Object(b.jsx)("div",{className:"row  justify-content-center ",children:Object(b.jsxs)("div",{className:" margin_top col-sm-6 col-md-6 col-lg-4 ",children:[Object(b.jsx)("img",{className:"image_1 ",src:j,alt:"background"}),Object(b.jsxs)("div",{className:" custom-card ",children:[Object(b.jsx)("h1",{className:"text",children:"Sign in to your account"}),Object(b.jsx)("h6",{className:"txt",children:" Username"}),Object(b.jsx)("input",{className:"form-control",type:" text",onChange:function(e){t.props.setUsername(e.target.value)}}),Object(b.jsx)("h6",{className:"mt-3",children:" Password"}),Object(b.jsx)("input",{className:"form-control",name:"password",type:"password",onChange:function(e){t.props.setPassword(e.target.value)}}),Object(b.jsx)("div",{children:Object(b.jsx)("button",{className:"button",onClick:this.props.submitHandler,children:"Continue"})})]})]})})})}}]),n}(o.a.Component),p=n(45),m=function(t){Object(r.a)(n,t);var e=Object(c.a)(n);function n(){var t;Object(s.a)(this,n);for(var a=arguments.length,r=new Array(a),c=0;c<a;c++)r[c]=arguments[c];return(t=e.call.apply(e,[this].concat(r))).state={username:"",password:""},t.submitHandler=function(e){t.state.username&&t.state.password?(e.preventDefault(),t.props.authHandler(t.state.username,t.state.password)):alert("Please fill all the details.")},t}return Object(a.a)(n,[{key:"render",value:function(){var t=this;if(this.props.loading)return Object(b.jsx)(p.a,{});var e=null;return this.props.isAuthenticated&&(e=Object(b.jsx)(l.a,{to:"/invoice"})),Object(b.jsxs)("div",{children:[e,Object(b.jsx)(h,{submitHandler:this.submitHandler,setUsername:function(e){return t.setState({username:e})},setPassword:function(e){return t.setState({password:e})}})]})}}]),n}(i.Component);e.default=Object(u.b)((function(t){return{error:t.auth.error,loading:t.auth.loading,isAuthenticated:null!==t.auth.token}}),(function(t){return{authHandler:function(e,n){return t(Object(d.e)(e,n))}}}))(m)}}]);
//# sourceMappingURL=12.a7b02547.chunk.js.map