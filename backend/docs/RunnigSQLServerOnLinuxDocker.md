# To Create A SQL Server 2019 Container

---

<pre>
sudo docker run -e "ACCEPT_EULA=Y" -e "SA_PASSWORD=1Password" \
   -p 1433:1433 --name sql2019 -h localhost \
   -d mcr.microsoft.com/mssql/server:2019-latest
</pre>

---

-   **Tip** : If you use Environment variables to store Service API Key And Connection String, You won't have to\
    change appsettings.json and secrets.json for modifying previously-mentioned items whenever you change your development/deployment environment.\
so USE CONNECTION_STRING and SERVICE_API_KEY to store these variables
