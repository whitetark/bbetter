using bbetter.API.Clients;
using bbetter.Database.Repositories;
using bbetterApi.Clients;
using bbetterApi.Middleware;
using bbetterApi.Services;
using database;
using database.Repositories;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using Swashbuckle.AspNetCore.Filters;
using System.Text;

var MyAllowSpecificOrigins = "_myAllowSpecificOrigins";

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddAuthentication(x =>
{
    x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
    x.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
}).AddJwtBearer(x =>
{
    x.RequireHttpsMetadata = false;
    x.SaveToken = true;
    x.TokenValidationParameters = new TokenValidationParameters
    {
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["JwtKey"]!)),
        ValidateIssuer = false,
        ValidateAudience = false,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
    };
});


builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(options =>
{
    options.AddSecurityDefinition("oauth2", new OpenApiSecurityScheme
    {
        In = ParameterLocation.Header,
        Name = "Authorization",
        Type = SecuritySchemeType.ApiKey
    });

    options.OperationFilter<SecurityRequirementsOperationFilter>();
});

builder.Services.AddSingleton<QuotableClient>();
builder.Services.AddSingleton<BoredClient>();
builder.Services.AddScoped<GPTClient>();

builder.Services.AddScoped<AccService>();
builder.Services.AddScoped<BHabitService>();
builder.Services.AddScoped<GHabitService>();
builder.Services.AddScoped<UserQuoteService>();
builder.Services.AddScoped<ReflectService>();
builder.Services.AddScoped<TaskService>();
builder.Services.AddScoped<WishService>();
builder.Services.AddScoped<QuoteOfDayService>();

builder.Services.AddScoped<AccountRepository>();
builder.Services.AddScoped<BHabitDateRepository>();
builder.Services.AddScoped<BHabitRepository>();
builder.Services.AddScoped<GHabitDateRepository>();
builder.Services.AddScoped<GHabitRepository>();
builder.Services.AddScoped<TaskRepository>();
builder.Services.AddScoped<UserQuoteRepository>();
builder.Services.AddScoped<WishRepository>();
builder.Services.AddScoped<ReflectionRepository>();
builder.Services.AddScoped<DEventRepository>();
builder.Services.AddScoped<DReflectionRepository>();

builder.Services.Configure<DbConfig>(builder.Configuration);
builder.Services.AddCors(options =>
{
    options.AddPolicy(name: MyAllowSpecificOrigins,
                      builder =>
                      {
                          builder.WithOrigins("http://localhost:5173");
                          builder.AllowCredentials();
                          builder.AllowAnyHeader();
                          builder.AllowAnyMethod();
                      });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors(MyAllowSpecificOrigins);
app.UseMiddleware<ErrorHandlerMiddleware>();
app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
