// js for tabs
    const tabs = document.querySelector(".support_tab_wrapper");
    const tabButton = document.querySelectorAll(".support_tab_button");
    const contents = document.querySelectorAll(".content");
    
    tabs.onclick = e => {
      const id = e.target.dataset.id;
      if (id) {
        tabButton.forEach(btn => {
          btn.classList.remove("active");
        });
        e.target.classList.add("active");
    
        contents.forEach(content => {
          content.classList.remove("active");
        });
        const element = document.getElementById(id);
        element.classList.add("active");
      }
    }

 // JS FOR THE TAG INPUTS USING IN FORM
    (function(){

      "use strict"
  
      
      // Plugin Constructor
      var TagsInput = function(opts){
          this.options = Object.assign(TagsInput.defaults , opts);
          this.init();
      }
  
      // Initialize the plugin
      TagsInput.prototype.init = function(opts){
          this.options = opts ? Object.assign(this.options, opts) : this.options;
  
          if(this.initialized)
              this.destroy();
              
          if(!(this.orignal_input = document.getElementById(this.options.selector)) ){
              console.error("tags-input couldn't find an element with the specified ID");
              return this;
          }
  
          this.arr = [];
          this.wrapper = document.createElement('div');
          this.input = document.createElement('input');
          init(this);
          initEvents(this);
  
          this.initialized =  true;
          return this;
      }
  
      // Add Tags
      TagsInput.prototype.addTag = function(string){
  
          if(this.anyErrors(string))
              return ;
  
          this.arr.push(string);
          var tagInput = this;
  
          var tag = document.createElement('span');
          tag.className = this.options.tagClass;
          tag.innerText = string;
  
          var closeIcon = document.createElement('a');
          closeIcon.innerHTML = '&times;';
          
          // delete the tag when icon is clicked
          closeIcon.addEventListener('click' , function(e){
              e.preventDefault();
              var tag = this.parentNode;
  
              for(var i =0 ;i < tagInput.wrapper.childNodes.length ; i++){
                  if(tagInput.wrapper.childNodes[i] == tag)
                      tagInput.deleteTag(tag , i);
              }
          })
  
  
          tag.appendChild(closeIcon);
          this.wrapper.insertBefore(tag , this.input);
          this.orignal_input.value = this.arr.join(',');
  
          return this;
      }
  
      // Delete Tags
      TagsInput.prototype.deleteTag = function(tag , i){
          tag.remove();
          this.arr.splice( i , 1);
          this.orignal_input.value =  this.arr.join(',');
          return this;
      }
  
      // Make sure input string have no error with the plugin
      TagsInput.prototype.anyErrors = function(string){
          if( this.options.max != null && this.arr.length >= this.options.max ){
              console.log('max tags limit reached');
              return true;
          }
          
          if(!this.options.duplicate && this.arr.indexOf(string) != -1 ){
              console.log('duplicate found " '+string+' " ')
              return true;
          }
  
          return false;
      }
  
      // Add tags programmatically 
      TagsInput.prototype.addData = function(array){
          var plugin = this;
          
          array.forEach(function(string){
              plugin.addTag(string);
          })
          return this;
      }
  
      // Get the Input String
      TagsInput.prototype.getInputString = function(){
          return this.arr.join(',');
      }
  
  
      // destroy the plugin
      TagsInput.prototype.destroy = function(){
          this.orignal_input.removeAttribute('hidden');
  
          delete this.orignal_input;
          var self = this;
          
          Object.keys(this).forEach(function(key){
              if(self[key] instanceof HTMLElement)
                  self[key].remove();
              
              if(key != 'options')
                  delete self[key];
          });
  
          this.initialized = false;
      }
  
      // Private function to initialize the tag input plugin
      function init(tags){
          tags.wrapper.append(tags.input);
          tags.wrapper.classList.add(tags.options.wrapperClass);
          tags.orignal_input.setAttribute('hidden' , 'true');
          tags.orignal_input.parentNode.insertBefore(tags.wrapper , tags.orignal_input);
      }
  
      // initialize the Events
      function initEvents(tags){
          tags.wrapper.addEventListener('click' ,function(){
              tags.input.focus();           
          });
          
  
          tags.input.addEventListener('keydown' , function(e){
              var str = tags.input.value.trim(); 
  
              if( !!(~[9 , 13 , 188].indexOf( e.keyCode ))  )
              {
                  e.preventDefault();
                  tags.input.value = "";
                  if(str != "")
                      tags.addTag(str);
              }
  
          });
      }
  
  
      // Set All the Default Values
      TagsInput.defaults = {
          selector : '',
          wrapperClass : 'tags-input-wrapper',
          tagClass : 'tag is-margin-right-small  border radius-5 is-size-7	mr-2 has-text-grey		',
          max : null,
          duplicate: false
      }
  
      window.TagsInput = TagsInput;
  
  })();
  
   var tagInput1 = new TagsInput({
              selector: 'tag-input1',
              duplicate : false,
              max : 100
          });
        
      
 
// JS FOR CUSTOM FILE DESIGN
          $('input[type="file"]').change(function(e) {
            console.log($(this).attr("id"));
            console.log(e.target.files);
            var printname;
            var fileName = e.target.files[0].name;
            ('The file "' + fileName + '" has been selected.');
            $(this).next("span").text(fileName);
            // $('.data-name').text(fileName);
        });

        $('.sidebar-collapse').click(function(){
                $('.left_support_tabs_sec').toggleClass('active_sidebar');

        });
        $('.remove_sidebar').click(function(){
            $('.left_support_tabs_sec').removeClass('active_sidebar');
        });

        



        // Inspiration: https://tympanus.net/codrops/2012/10/04/custom-drop-down-list-styling/


function DropDown(el) {
    this.dd = el;
    this.placeholder = this.dd.children('span');
    this.opts = this.dd.find('ul.drop li');
    this.val = '';
    this.index = -1;
    this.initEvents();
}

DropDown.prototype = {
    initEvents: function () {
        var obj = this;
        obj.dd.on('click', function (e) {
            e.preventDefault();
            e.stopPropagation();
            $(this).toggleClass('active');
        });
        obj.opts.on('click', function () {
            var opt = $(this);
            obj.val = opt.text();
            obj.index = opt.index();
            obj.placeholder.text(obj.val);
            opt.siblings().removeClass('selected');
            opt.filter(':contains("' + obj.val + '")').addClass('selected');
        }).change();
    },
    getValue: function () {
        return this.val;
    },
    getIndex: function () {
        return this.index;
    }
};

$(function () {
    // create new variable for each menu
    var dd1 = new DropDown($('#noble-gases'));
    // var dd2 = new DropDown($('#other-gases'));
    $(document).click(function () {
        // close menu on document click
        $('.wrap-drop').removeClass('active');
    });
});