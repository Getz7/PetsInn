var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddCors(options => {
    options.AddPolicy(name: "MyCorsPolicy",
        policy => {
            policy.AllowAnyOrigin(); //www.mypage.com, www.mypage.net, etc
            policy.AllowAnyHeader(); //application/json  application/xml application/text
            policy.AllowAnyMethod(); //GET, POST, PUT, DELETE
        });
});

var app = builder.Build();
//Expocenfo app.Urls.Add("http://192.168.50.229:8080");
// dependiendo de la red
app.Urls.Add("http://192.168.0.19:8080");
//app.Urls.Add("http://192.168.0.19:8080");
//Casa
//app.Urls.Add("http://192.168.0.5:8080");
//Casa Nilce
//app.Urls.Add("http://192.168.0.138:8080");


if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.UseRouting();
app.Use( (context, next) =>
{
    
 
    Console.WriteLine(context.Request.Headers);
    return next(context);
    
});

app.UseCors("MyCorsPolicy");
app.UseEndpoints(endpoints =>
{
    endpoints.MapControllers().RequireCors("MyCorsPolicy");
});

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();



app.Run();