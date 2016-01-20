

var obj=[];
var lights = [];
var materialNames = [];
var objects = [];


/*
Parse .mtl file as string and return an object for the mtl data
*/
function parseMtl(mtlData)
{
  var materials =[];
  var textureFiles = [];
  var lines = mtlData.split("\n");
  var len = lines.length;
  // Remove commments and empty lines
  for(i=0;i<len;i++)
  {
    if(lines[i].substring(0,1) == '#' || lines[i].length<1)
    {
      continue;
    }
    var parsed="";
    parsed += lines[i]+'\n';

    if(lines[i].startsWith('newmtl'))
    {
      var mtl={};
      var splitVals;
      mtl.mname = lines[i].substring(7);
      while((i+1)<len && !(lines[i+1].startsWith('newmtl')))
      {
        i++;
        if(lines[i].trim().startsWith('Ka') || lines[i].trim().startsWith('Kd') || lines[i].trim().startsWith('Ks'))
        {
          var kValues = lines[i].split(" ");
          if(lines[i].trim().startsWith('Ka'))
          {
            mtl.ka=[];
            mtl.ka.push(parseFloat(kValues[1]),parseFloat(kValues[2]),parseFloat(kValues[3]));
          }
          if(lines[i].trim().startsWith('Kd'))
          {
            mtl.kd=[];
            mtl.kd.push(parseFloat(kValues[1]),parseFloat(kValues[2]),parseFloat(kValues[3]));
          }
          if(lines[i].trim().startsWith('Ks'))
          {
            mtl.ks=[];
            mtl.ks.push(parseFloat(kValues[1]),parseFloat(kValues[2]),parseFloat(kValues[3]));
          }
        }
        if(lines[i].trim().startsWith('illum'))
        {
           var splitVals = lines[i].split(" ");
           mtl.illum = splitVals[1];
        }
        if(lines[i].trim().startsWith('Ns') || lines[i].trim().startsWith('N'))
        {
          var splitVals = lines[i].split(" ");
          mtl.Ns = parseFloat(splitVals[1]);
        }
        if(lines[i].trim().startsWith('map_Kd') )
        {
          var splitVals = lines[i].split(" ");
          mtl.map_Kd = splitVals[1];
          textureFiles.push(splitVals[1]);
        }
      }
      if(!mtl.ka){mtl.ka=[0.1,0.1,0.1]}
      if(!mtl.ks){mtl.ks=[0.7,0.7,0.7]}
      if(!mtl.kd){mtl.kd=[0.4,0.4,0.4]}

      materials.push(mtl);
    }
  }
  materials.textureFiles = textureFiles;


//  console.log("\ntextures "+materials.textureFiles);
  return materials;
}



/*
Parse .obj file as string and return an object for the obj data
*/
function parseObj(objData)
{
  var lines = objData.split("\n");
  var len = lines.length;
  var obj = {};
  obj.vertices=[];
  obj.normals=[];
  obj.textures=[];
  obj.groups = []
  obj.maxX = -999999;
  obj.maxY = -999999;
  obj.maxZ = -999999;
  obj.minX = 999999;
  obj.minY = 999999;
  obj.minZ = 999999;
  for(i=0;i<len;i++)
  {

    if(lines[i].trim().startsWith("#"))
    {
      continue;
    }

    if(lines[i].trim().startsWith("mtllib"))
    {
      obj.mtllib = lines[i].split(" ")[1];
      continue;
    }

    // saving all the obj.groups
    if(lines[i].trim().startsWith("g ") || lines[i].trim().startsWith("usemtl ") )
    {
        if(lines[i].length<2)
        {
          continue;
        }
        var group=[];
        var faces=[];
        group.gname = lines[i].split(" ")[1];
        if(group.gname.startsWith("light"))
        {
          continue;
        }
        if(!lines[i].trim().startsWith("usemtl "))
        { i++; }

        while((lines[i].trim().startsWith("usemtl")&& !group.mtlname) || lines[i].trim().startsWith("s ") || lines[i].trim().startsWith("f "))
        {
          if(lines[i].trim().startsWith("usemtl"))
          {
            group.mtlname = lines[i].split(" ")[1];
          }
          if(lines[i].trim().startsWith("s "))
          {
            group.s = lines[i].split(" ")[1];
          }
          while(lines[i].trim().startsWith("f "))
          {
            var flag=1;
              var item = [];
              var vtn = [];
              var temp;
              temp = lines[i].split(" ");
              for(j=1;j<temp.length;j++)
              {
              item.push(temp[j]);
              }
              for(k=0;k<item.length;k++)
              {
                var slspl = item[k].split("/")
                var fcomp = [];
                fcomp.push(slspl[0],slspl[1],slspl[2]);
                vtn.push(fcomp);
              }
              faces.push(vtn);
              i++;
          }
          if(flag==1)
          {i--;
          flag=0;}
          i++;
        }
        group.faces = faces;
        faces=[];
        obj.groups.push(group);
      }
      if(lines[i].trim().startsWith("usemtl"))
      {
        i--;
        continue;
      }

      //for group name and mtl lines
      if(lines[i].trim().startsWith("group"))
      {
        var mtlname;
        var name = lines[i].split(" ")[1];
        i++;
        if(lines[i].trim().startsWith("usemtl"))
        {
          mtlname = lines[i].split(" ")[1];
        }
        for(m=0;m<obj.groups.length;m++)
        {
          if(obj.groups[m].gname === name)
          {
            obj.groups[m].mtlname = mtlname;
          }
        }
      }

    // Save all the obj.vertices , obj.normals and texture coordinates
    while(lines[i].startsWith("v ") || lines[i].startsWith("vn ") || lines[i].startsWith("vt "))
    {
      var item = [];
      var temp;
      lines[i]=lines[i].replace(/\s\s/g,' ');

      temp = lines[i].split(" ");
      for(j=1;j<temp.length;j++)
      {
        item.push(parseFloat(temp[j]));
      }
      if(lines[i].startsWith("v "))
      {
        if(item[0]>obj.maxX)obj.maxX=item[0];
        if(item[0]<obj.minX)obj.minX=item[0];
        if(item[1]>obj.maxY)obj.maxY=item[1];
        if(item[1]<obj.minY)obj.minY=item[1];
        if(item[2]>obj.maxZ)obj.maxZ=item[2];
        if(item[2]<obj.minZ)obj.minZ=item[2];
        obj.vertices.push(item);
      }
      if(lines[i].startsWith("vn "))
      {
        obj.normals.push(item);
      }
      if(lines[i].startsWith("vt "))
      {
        obj.textures.push(item);
      }

      i++;
    }
  }
  //Test
  // console.log("verices:"+obj.vertices.length+"\nobj.normals"+obj.normals.length+"\nobj.textures : "+obj.textures.length+"\obj.groups: "+obj.groups.length);
  // console.log("\ngroup 1:"+obj.groups[0].gname+" "+obj.groups[0].mtlname+" "+obj.groups[0].faces.length);
  // console.log("\nv"+obj.vertices[0]);
  // console.log("\nn"+obj.normals[0]);
  // console.log("\nt"+obj.textures[0]);
  // console.log("\nf"+obj.groups[0].faces[5][2]);
  // console.log("\nmtllib "+obj.mtllib);
//  console.log("group materials "+obj.groups[0].material.map_kd);
  // console.log("Done parsing");
  return obj;
}

/*
Parses lights.txt
*/
function parseLights(lightData)
{
    var lines = lightData.split("\n");
    var len = lines.length;
  for(i=0;i<len;i++)
  {
    if(lines[i].startsWith('#') || lines[i].length<1)
    {
      continue;
    }
    var elems = lines[i].trim().split(" ");
    if(elems.length<12)
    {
      for(j=elems.length;j<12;j++)
      {
        elems.push(0.0)
      }

    }
    lights=lights.concat(elems);
  }
//  console.log(lights);
  return lights;
}

function parseHierarchy(hdata)
{
  var lines = hdata.split("\n");
  var len = lines.length;
  var childindex = 1;
  for(i=0;i<len;i++)
  {
    while(i<len)
    {
      if(lines[i].startsWith('#')) { i++ ; continue; }
      var object = {};
      object.obj = lines[i]; i++;
      object.transform = [];
      object.transform = lines[i].split(" "); i++ ;
      object.numChildren = parseInt(lines[i]); i++
      object.childIndexStart = childindex;
      childindex = childindex+object.numChildren;
      objects.push(object);
      i++
    }
  }
//  console.log(objects[1].obj);
  return objects;
}
