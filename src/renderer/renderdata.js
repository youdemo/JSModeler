JSM.RenderLight = function (ambient, diffuse, specular, direction)
{
	this.ambient = JSM.HexColorToNormalizedRGBComponents (ambient);
	this.diffuse = JSM.HexColorToNormalizedRGBComponents (diffuse);
	this.specular = JSM.HexColorToNormalizedRGBComponents (specular);
	this.direction = direction.Clone ();
};

JSM.RenderMaterialType = {
	Normal : 0,
	Textured : 1,
	NormalTransparent : 2,
	TexturedTransparent : 3
};

JSM.RenderMaterial = function (ambient, diffuse, specular, shininess, opacity, texture, textureWidth, textureHeight)
{
	this.ambient = ambient;
	this.diffuse = diffuse;
	this.specular = specular;
	this.shininess = shininess;
	this.opacity = opacity;
	this.texture = texture;
	this.textureWidth = textureWidth;
	this.textureHeight = textureHeight;
	
	this.textureBuffer = null;
	this.textureImage = null;
	
	this.type = JSM.RenderMaterialType.Normal;
	if (this.texture !== null) {
		if (this.opacity < 1.0) {
			this.type = JSM.RenderMaterialType.TexturedTransparent;
		} else {
			this.type = JSM.RenderMaterialType.Textured;
		}
	} else {
		if (this.opacity < 1.0) {
			this.type = JSM.RenderMaterialType.NormalTransparent;
		} else {
			this.type = JSM.RenderMaterialType.Normal;
		}
	}
};

JSM.RenderMesh = function (material)
{
	this.material = material;
	
	this.vertexArray = null;
	this.normalArray = null;
	this.uvArray = null;
	
	this.vertexBuffer = null;
	this.normalBuffer = null;
	this.uvBuffer = null;
};

JSM.RenderMesh.prototype.SetMaterial = function (material)
{
	this.material = material;
};

JSM.RenderMesh.prototype.GetMaterial = function ()
{
	return this.material;
};

JSM.RenderMesh.prototype.SetVertexArray = function (vertices)
{
	this.vertexArray = new Float32Array (vertices);
};

JSM.RenderMesh.prototype.SetNormalArray = function (normals)
{
	this.normalArray = new Float32Array (normals);
};

JSM.RenderMesh.prototype.SetUVArray = function (uvs)
{
	this.uvArray = new Float32Array (uvs);
};

JSM.RenderMesh.prototype.GetVertexBuffer = function ()
{
	return this.vertexBuffer;
};

JSM.RenderMesh.prototype.GetNormalBuffer = function ()
{
	return this.normalBuffer;
};

JSM.RenderMesh.prototype.GetUVBuffer = function ()
{
	return this.uvBuffer;
};

JSM.RenderMesh.prototype.VertexCount = function ()
{
	return parseInt (this.vertexArray.length / 3, 10);
};

JSM.RenderMesh.prototype.GetVertex = function (index)
{
	return new JSM.Coord (this.vertexArray[3 * index], this.vertexArray[3 * index + 1], this.vertexArray[3 * index + 2]);
};

JSM.RenderMesh.prototype.GetTransformedVertex = function (index, transformation)
{
	var vertex = this.GetVertex (index);
	return transformation.Apply (vertex);
};

JSM.RenderBody = function ()
{
	this.transformation = new JSM.Transformation ();
	this.meshes = {};
};

JSM.RenderBody.prototype.AddMesh = function (mesh)
{
	if (this.meshes[mesh.material.type] === undefined) {
		this.meshes[mesh.material.type] = [];
	}
	this.meshes[mesh.material.type].push (mesh);
};

JSM.RenderBody.prototype.EnumerateMeshes = function (onMeshFound)
{
	var type;
	for (type in this.meshes) {
		if (this.meshes.hasOwnProperty (type)) {
			this.EnumerateTypedMeshes (type, onMeshFound);
		}
	}
};

JSM.RenderBody.prototype.EnumerateTypedMeshes = function (meshType, onMeshFound)
{
	var typedMeshes = this.meshes[meshType];
	if (typedMeshes === undefined) {
		return;
	}

	var	i, typedMesh;
	for	(i = 0; i < typedMeshes.length; i++) {
		typedMesh = typedMeshes[i];
		onMeshFound (typedMesh);
	}
};

JSM.RenderBody.prototype.GetTransformation = function ()
{
	return this.transformation;
};

JSM.RenderBody.prototype.GetTransformationMatrix = function ()
{
	return this.transformation.matrix;
};

JSM.RenderBody.prototype.SetTransformation = function (transformation)
{
	this.transformation = transformation;
};
