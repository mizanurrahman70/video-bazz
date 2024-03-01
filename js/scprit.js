const buttonConteinner=document.getElementById('btn-conteiner')
const cardConteinner=document.getElementById('card-container')
const catagori= ()=>{
    fetch('https://openapi.programming-hero.com/api/videos/categories')
    .then(repo => repo.json())
    .then(({data}) => data.forEach(card => {
        const newBtn=document.createElement('button')
        newBtn.classList.add('btn-secondary')
        newBtn.classList.add('btn')
        newBtn.classList.add('ml-5')
        newBtn.classList.add('bg-red-600')
       newBtn.innerText=card.category
       newBtn.addEventListener('click',()=>fatchCatagori(card.category_id)
    
       )
       buttonConteinner.appendChild(newBtn)
    }))

}
let allCata=1000
let sortBy=false
const short =document.getElementById('short').addEventListener('click',()=>{
    sortBy=true
    fatchCatagori(allCata,sortBy)
})
 const fatchCatagori=(catagoriId,sortBy)=>{
     allCata=catagoriId
     const loader= document.getElementById('loader')
     loader.classList.remove('hidden')
    const error =document.getElementById('error-element')
cardConteinner.textContent=''
 fetch(`https://openapi.programming-hero.com/api/videos/category/${catagoriId}`)
 .then(repo => repo.json())
 .then(({data})=>{data.forEach(video =>{
   if(short){
    data.short((a,b)=>{
        const totalViewSrtF=a.others?.views
        const totalViewSrtS=b.others?.views
        const totalFNumer=parseFloat.apply(totalViewSrtF.replace('k','')) ||0;
        const totalSNumber=parseFloat.apply(totalViewSrtF.replace('k','')) ||0;
        return (totalSNumber-totalFNumer) 
    })
   }
    if(data.length >0){
    loader.classList.add('hidden')
    
  }
  if(data.length ===0){
    
  }
  else{
    error.classList.add('hidden')
  }

    
  
  let verifyBag =''
  if(video.authors[0].verified){
    verifyBag=`<p class="w-6 h-6" >Verified</p>`
  }
 const div=document.createElement('div')
 
 div.innerHTML=`
 <div class="card w-full bg-base-100 shadow-xl">
                  <figure class="overflow-hidden h-72">
                      <img class="w-full" src="${video.thumbnail}" alt="Shoes" />
                      <h6 class="absolute bottom-[40%] right-12">0 hr</h6>
                  </figure>
                  <div class="card-body">
                      <div class="flex space-x-4 justify-start items-start">
                          <div>
                              <img class="w-12 h-12 rounded-full" src="${video.authors[0].profile_picture}" alt="Shoes" />
                          </div>
                          <div>
                              <h2 class="card-title">${video.title}</h2>
                              <div class="flex mt-3">
                                  <p class="">${video.authors[0].profile_name}</p>
                                  ${verifyBag}
                              </div>
                              <p class="mt-3">${video.others.views} </p>
                          </div>
                      </div>
                  </div>
              </div>
 `
      
       

       cardConteinner.appendChild(div)
       
    
 })

 }
 )}
catagori()
fatchCatagori(allCata,sortBy)