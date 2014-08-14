namespace :pg do
  desc "development environment: start the pg server and specify logfile"

  task :start do
    %x[pg_ctl -D /usr/local/var/postgres -l #{Rails.root}/log/pg.log start]
  end

end
